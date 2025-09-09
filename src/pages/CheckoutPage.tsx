/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  CreditCard,
  Lock,
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";
import emailjs from "emailjs-com";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  needCustomization: boolean;
  customizationDetails: string;
}

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    needCustomization: false,
    customizationDetails: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setUserDetails((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const sendEmailNotifications = async (orderDetails: any) => {
    try {
      // Email to buyer
      await emailjs.send(
        "service_3qnlsla", // Replace with your EmailJS service ID
        "template_diyi8rc", // Replace with your buyer template ID
        {
          to_name: userDetails.name,
          to_email: userDetails.email,
          order_total: formatPrice(state.total),
          templates: state.items
            .map((item) => `${item.title} x${item.quantity}`)
            .join(", "),
          contact_email: "mtbalraj@gmail.com",
          whatsapp: "+91 8618319154",
        },
        "BPaXFxTGB1pCQiLuV" // Replace with your EmailJS public key
      );

      // Email to seller
      await emailjs.send(
        "service_3qnlsla", // Replace with your EmailJS service ID
        "template_diyi8rc", // Replace with your seller template ID
        {
          buyer_name: userDetails.name,
          buyer_email: userDetails.email,
          buyer_phone: userDetails.phone,
          order_total: formatPrice(state.total),
          templates: state.items
            .map((item) => `${item.title} x${item.quantity}`)
            .join(", "),
          customization_needed: userDetails.needCustomization ? "Yes" : "No",
          customization_details: userDetails.customizationDetails,
          to_email: "mtbalraj@gmail.com",
        },
        "BPaXFxTGB1pCQiLuV" // Replace with your EmailJS public key
      );
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Open Razorpay payment link
      window.open("https://rzp.io/rzp/lyNamEi", "_blank");

      // Simulate payment success (in a real app, you'd get payment confirmation from Razorpay)
      setTimeout(async () => {
        // Send email notifications
        await sendEmailNotifications({
          buyer: userDetails,
          items: state.items,
          total: state.total,
        });

        // Clear cart
        dispatch({ type: "CLEAR_CART" });

        alert(
          "Payment successful! You will receive your templates via email within 5-10 minutes."
        );
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No items to checkout
            </h2>
            <p className="text-lg text-gray-600">
              Please add items to your cart first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your purchase to get instant access to your templates
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Details Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Your Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="needCustomization"
                      checked={userDetails.needCustomization}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I need you to customize this webpage for me
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    If checked, I will contact you personally for customization
                  </p>
                </div>

                {userDetails.needCustomization && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-1" />
                      Customization Details
                    </label>
                    <textarea
                      name="customizationDetails"
                      value={userDetails.customizationDetails}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe what customizations you need..."
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay with Razorpay
                  </>
                )}
              </button>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Lock className="h-4 w-4 mr-2" />
                  Secure payment with 256-bit SSL encryption
                </div>
                <div className="text-gray-600">
                  💳 Supports UPI, Cards, Net Banking, and Wallets
                </div>
                <div className="text-gray-600">
                  📧 Templates delivered via email within 5-10 minutes
                </div>
                <div className="text-gray-600">
                  🔧 Free customization if requested
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-2">
                  Contact Support
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📧 mtbalraj@gmail.com</div>
                  <div>📱 WhatsApp: +91 8618319154</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
