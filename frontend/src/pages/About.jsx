import React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';

function About() {
  const {navigator} = useContext(StoreContext)
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-8 lg:p-12">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs sm:text-sm uppercase text-indigo-600 font-semibold tracking-wide mb-3">About Our Store</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-5">
              A smarter shopping experience for every need.
            </h1>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-600 mb-6">
              Our e-commerce store offers premium products, fast delivery,
              and trusted customer support. From fashion to electronics, we bring only the best items in every category.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
              <div className="rounded-2xl bg-indigo-200 p-4 sm:p-5">
                <p className="text-2xl sm:text-3xl font-bold text-indigo-700">24/7</p>
                <p className="text-xs sm:text-sm text-slate-600">Customer Support</p>
              </div>
              <div className="rounded-2xl bg-slate-300 p-4 sm:p-5">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">1000+</p>
                <p className="text-xs sm:text-sm text-slate-600">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 h-64 sm:h-80 flex items-end justify-start p-4 sm:p-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 max-w-xs w-full">
              <p className="text-xs sm:text-sm uppercase text-slate-500 tracking-wide mb-2">Trusted Quality</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-3">Every product verified</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Quality, authenticity, and customer satisfaction are our top priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl sm:rounded-3xl bg-slate-50 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
            Our goal is to provide every customer with the best products, affordable prices,
            and a seamless shopping experience. We deliver both speed and quality in every order.
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-slate-50 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Our Values</h2>
          <ul className="space-y-3 text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
            <li>• Customer-first approach and clear communication</li>
            <li>• Secure checkout and data protection</li>
            <li>• Easy returns and responsive support</li>
            <li>• Reliable delivery across India</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-indigo-600 font-semibold">Why choose us</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 sm:mt-3">Your partner at every step</h2>
          </div>
          <button onClick={() => navigator('Collection')} className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl sm:rounded-3xl bg-indigo-100 p-4 sm:p-5">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2">Fast Delivery</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-5 sm:leading-6">Express delivery options ensure your order reaches home quickly.</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl bg-slate-300 p-4 sm:p-5">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Easy Returns</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-5 sm:leading-6">Easy return policy lets you shop without worries.</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl bg-indigo-100 p-4 sm:p-5">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2">Secure Checkout</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-5 sm:leading-6">Every payment is secure, and we prioritize your privacy.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl bg-slate-300 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Contact & Support</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7 mb-6">
          If you need help with any product, order, or delivery, our team is always available for you.
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500">Email</p>
            <p className="text-base sm:text-lg font-semibold text-slate-900">adityakumar712279@gmail.com</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500">Phone</p>
            <p className="text-base sm:text-lg font-semibold text-slate-900">+91 6202712279</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500">Delivery</p>
            <p className="text-base sm:text-lg font-semibold text-slate-900">Nationwide shipping available</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;