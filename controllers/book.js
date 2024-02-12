import Booking from "../models/Booking.js";
export const createBooking = async (req, res, next) => {
  const newBooking = new Booking(req.body);

  try {
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.user, salt);
    const savedBooking = await newBooking.save();

    // const savedBooking = new Booking({
    //   ...req.body,
    //   user: hash,
    // });
    // await savedBooking.save()

    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find();
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const countBooking = async (req, res, next) => {
  try {
    const book = await Booking.find({})
    
    res.status(200).json(book.length);
  } catch (err) {
    next(err);
  }
};