import { model, models, Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    lastName: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    streetNumber: String,
    country: String,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model('Order', OrderSchema);
