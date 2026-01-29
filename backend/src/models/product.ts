import mongoose from 'mongoose';

interface IImage {
  fileName: string,
  originalName: string,
}

interface IProduct {
  title: string;
  image: IImage ;
  category: string;
  description?: string;
  price?: number | null;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    fileName: {
      type: String,
      required: [true, 'Введите имя файла'],
    },
    originalName: {
      type: String,
      required: [true, 'введите originalName'],
    },
  },
  { _id: false }, // не добавляет id для вложенного объекта
);

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Введите название'],
    unique: true,
    minlength: [2, 'The minimum length of the "title" field is 2.'],
    maxlength: [30, 'The maximum length of the "title" field is 30.'],
  },
  image: {
    type: imageSchema,
    required: true,
  },
  category: {
    required: [true, 'Выберите категорию'],
    type: String,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: null,
  },

});

export default mongoose.model<IProduct>('product', productSchema);
