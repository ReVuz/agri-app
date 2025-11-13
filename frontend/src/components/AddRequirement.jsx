import { useState } from "react";

function AddRequirement() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    deliveryDate: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/requirements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus({
          type: "success",
          notifiedFarmers: data.notifiedFarmers,
        });
        setFormData({
          productName: "",
          quantity: "",
          deliveryDate: "",
          notes: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to submit requirement. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
      console.error("Error submitting requirement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">
              Add Product Requirement
            </h1>
            <p className="mt-2 text-green-100">
              Submit your product requirements and we'll notify relevant farmers
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="e.g., Organic Tomatoes, Fresh Corn, etc."
              />
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter quantity"
              />
            </div>

            {/* Delivery Date */}
            <div>
              <label
                htmlFor="deliveryDate"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Delivery Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Notes{" "}
                <span className="text-gray-400 text-xs font-normal">
                  (Optional)
                </span>
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder="Any additional information or special requirements..."
              />
            </div>

            {/* Submit Status Message */}
            {submitStatus && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <p className="font-medium">
                  {submitStatus.type === "success" ? (
                    submitStatus.notifiedFarmers.length > 0 ? (
                      // Case: Farmers were notified (Test Cases 1 & 2)
                      <>
                        Requirement submitted successfully! <br />
                        **Notified Farmers:**{" "}
                        {submitStatus.notifiedFarmers.join(", ")}
                      </>
                    ) : (
                      // Case: No farmers found (Test Case 3)
                      "Requirement submitted, but no farmers were found for this product."
                    )
                  ) : (
                    // Case: Error
                    submitStatus.message
                  )}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Requirement"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRequirement;
