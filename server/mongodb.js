// app.post("/", async (req, res) => {
//   const { email, phone, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Already have this email or phone" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// });

// app.post("/test-db", async (req, res) => {
//   const { email, phone, password } = req.body;

//   try {
//     const newUser = new User({ email, phone, password });
//     await newUser.save();
//     res.status(201).json({ message: "User added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding user", error });
//   }
// });
