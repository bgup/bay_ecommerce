import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [{ type: String }],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);
//Virtuals
//qty left
ProductSchema.virtual("qtyLeft").get(function () {
  const product = this;
  return product.totalQty - product.totalSold;
});
//Total rating
ProductSchema.virtual("totalReviews").get(function () {
  const product = this;
  return product?.reviews?.length;
});
//Calificación promedio básica.
ProductSchema.virtual("averageRating").get(function () {
  const product = this;
  let ratingTotal = 0;
  product?.reviews?.forEach((review) => {
    ratingTotal += review?.rating;
  });
  const averageRating = Number(ratingTotal / product?.reviews?.length).toFixed(
    1
  );
  return averageRating;
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;