import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ContactSection() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form values:', values);
      alert('Form submitted successfully!');
      resetForm();
    }
  });

  useEffect(() => {
    import("wowjs").then((module) => {
      const WOW = module.default || module.WOW;
      new WOW.WOW({ live: false }).init();
    });
  }, []);

  return (
    <section className="py-24 px-5 bg-black">
      <div className="max-w-2xl mx-auto wow animate__animated animate__fadeInUp" data-wow-duration="1s">
        <h2 className="text-yellow text-4xl md:text-5xl lg:text-6xl font-bold rounded-xld tracking-wider mb-10 text-center uppercase">
          Get In Touch
        </h2>
        <div className="flex flex-col gap-5 text-black">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-5 py-4 text-base border rounded-xl ${
                formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : 'border-gray-200'
              } bg-gray-50 focus:border-gray-400 focus:outline-none transition-colors duration-300`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-5 py-4 text-base border rounded-xl ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-200'
              } bg-gray-50 focus:border-gray-400 focus:outline-none transition-colors duration-300`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-5 py-4 text-base border rounded-xl ${
                formik.touched.message && formik.errors.message
                  ? 'border-red-500'
                  : 'border-gray-200'
              } bg-gray-50 resize-y focus:border-gray-400 focus:outline-none transition-colors duration-300`}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
            )}
          </div>

          <button 
            type="button"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            className="text-black px-12 py-4 text-base font-medium tracking-widest uppercase bg-yellow hover:bg-yellow-300 disabled:bg-gray-400 transition-all duration-300 mt-3 rounded-xl"
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </section>
  );
}