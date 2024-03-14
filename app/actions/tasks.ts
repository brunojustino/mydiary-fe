"use server";

// Import the database client and the Post type from Prisma
import db from "@/app/db";
import type { Tasks } from "@prisma/client";
import { auth } from "@/app/auth";

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Import the Zod library for validation
import { z } from "zod";

// Define a schema for the post using Zod
const tasksSchema = z.object({
  description: z.string().min(3).max(255),
});

// Define an interface for the form state
interface TasksFormState {
  errors: {
    description?: string[];
    _form?: string[];
  };
}

// Define an asynchronous function to create a post
export async function createTasks(
  formState: TasksFormState,
  formData: FormData
): Promise<TasksFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Please login first"],
      },
    };
  }
  // Validate the form data against the post schema
  // If the form data does not match the schema, the safeParse method returns an object
  // with a success property of false and an error property containing the validation errors.
  // If the form data matches the schema, the safeParse method returns an object
  // with a success property of true and a data property containing the validated data.
  const result = tasksSchema.safeParse({
    description: formData.get("description"),
  });

  // If validation fails, return the errors
  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  let tasks: Tasks;
  try {
    // If validation passes, create a new post in the database
    tasks = await db.tasks.create({
      data: {
        description: result.data.description,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    // If there's an error, return it
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  // Revalidate the path and redirect to the home page
  revalidatePath("/");
  redirect("/");
}

export async function updateTasks(
  id: string,
  formState: TasksFormState,
  formData: FormData
): Promise<TasksFormState> {
  const result = tasksSchema.safeParse({
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let tasks: Tasks;
  try {
    tasks = await db.tasks.update({
      where: { id },
      data: {
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function deletePost(id: string): Promise<TasksFormState> {
  let tasks: Tasks;
  try {
    tasks = await db.tasks.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}
