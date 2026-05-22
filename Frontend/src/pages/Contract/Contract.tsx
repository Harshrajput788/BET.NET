import React, { useState } from "react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔗 Connect API here
    console.log("Contact Form:", form);
  };

  return (
    <main className="min-h-screen bg-orange-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h1 className="text-4xl font-extrabold text-orange-600">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have a question, feedback, or collaboration idea?
            We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Get in Touch
          </h2>
          <p className="mt-4 text-gray-600">
            Reach out to us anytime. We usually respond within 24 hours.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p>
              📧 <span className="font-medium">Email:</span>{" "}
              support@bet.net
            </p>
            <p>
              📍 <span className="font-medium">Location:</span>{" "}
              India
            </p>
            <p>
              🌐 <span className="font-medium">Website:</span>{" "}
              bet.net
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            Send a Message
          </h3>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* Footer CTA */}
      <section className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold">
            We’re Always Happy to Help
          </h2>
          <p className="mt-2 text-orange-100">
            Your thoughts and questions matter to us.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;