import type { Route } from "./+types";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  // Submit form data to the server

  // Get the formData from the Form component using the "request" parameter
  const formData = await request.formData();

  // Get the values of the inputs using formData and the input's "name" attribute
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Create a data object
  const data = {
    name,
    email,
    subject,
    message
  };

  /**
   * Create an errors object to:
   * - Validate the formData properties
   * - Assign appropriate errors' values
   * - Return the errors object to the ContactPage component (via actionData)
   */
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid Email Format";
  }
  if (!subject) errors.subject = "Subject is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return {errors};
  }

  // return an "actionData" object to the ContactPage component
  return { message: "Form Submitted Successfully", data };
}

// Pass the actionData as a prop from the action function to the ContactPage
function ContactPage({ actionData }: Route.ComponentProps) {

  const errors = actionData?.errors || {};
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        Contact Me
      </h2>

      { actionData?.message && (
        <p
          className="mb-6 py-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md"
        >
          {actionData.message}
        </p>
      )}
      <Form method="post" className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          { errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          { errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          { errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          { errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="cursour-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </Form>
    </div>
  )
}

export default ContactPage