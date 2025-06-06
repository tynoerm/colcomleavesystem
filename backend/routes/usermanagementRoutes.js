import express from "express";
import bcrypt from "bcryptjs"; // Password hashing (optional, but highly recommended)
import usersSchema from "../models/userManagementModal.js";

const router = express.Router();

// REGISTER USER
router.post("/create-user", async (req, res, next) => {
  try {
    const { fullName, employerNumber, nationalId, role, department } = req.body;

    // Check if employerNumber already exists
    const existingUser = await usersSchema.findOne({ employerNumber });
    if (existingUser) {
      return res.status(409).json({ message: "employerNumber already exists" });
    }

    // Use nationalId as password and hash it
    const hashedPassword = await bcrypt.hash(nationalId, 10);

    const user = await usersSchema.create({
      fullName,
      employerNumber,
      password: hashedPassword, // password is hashed nationalId
      nationalId,
      role,
      department,
    });

    return res.status(201).json({
      data: user,
      message: "User created successfully",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
});


// LOGIN USER
router.post("/login", async (req, res) => {
  const { employerNumber, nationalId } = req.body; // user sends both

  try {
    // Find user by employerNumber
    const user = await usersSchema.findOne({ employerNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare input nationalId with stored nationalId (plain text)
    if (nationalId !== user.nationalId) {
      return res.status(401).json({ message: "Invalid National ID" });
    }

    // Login successful
    return res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
        role: user.role,
        department: user.department,
        employerNumber: user.employerNumber,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.route("/").get(async (req, res, next) => {
  await usersSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "control mapped successfully done",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.route("/update-password/:id").put(async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = await usersSchema.findByIdAndUpdate(
      id,
      req.body, // expects { password: "newpassword" }
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }

    res.json({
      data: updatedUser,
      message: "Password updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Failed to update password",
      status: 500,
    });
  }
});



export { router as usersRoutes };
