// Get User by email
app.get("/user", async (req, res) => {
  const UserEmail = req.body.emailId;
  try {
    const userData = await User.findOne({ emailId: UserEmail });
    if (userData.length === 0) {
      res.status(404).send("User not found");
    } else {
      res
        .status(200)
        .send({ message: "user data found successfully", data: userData });
    }
  } catch (err) {
    res.status(400).send({ User, err });
  }
});

// Feed API - GET /feed - get all user from the database
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find({});
    if (userData.length === 0) {
      res.status(404).send({ message: "No Data" });
    } else {
      res
        .status(200)
        .send({ message: "user data fetched successfully", data: userData });
    }
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", err });
  }
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await User.findById(userId);
    res
      .status(200)
      .send({ message: `user data found for id:${userId}`, data: userData });
  } catch (err) {
    res.status(400).send({ message: "something went wrong", err });
  }
});

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await user.findByIdAndDelete({ _id: userId });
    res.status(200).send({
      message: `user data deleted successfully for id:${userId}`,
      data: userData,
    });
  } catch (err) {
    res.status(400).send({ message: "something went wrong", err });
  }
});

app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "age", "about", "skills", "gender"];
    const isAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("update not allowed");
    }
    const UpadtedData = await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
      runValidators: true,
    });
    if (!UpadtedData) {
      res.status(404).send({ message: `User not found with id:${userId}` });
    }
    res
      .status(200)
      .send({ message: "user updated successfully", data: UpadtedData });
  } catch (err) {
    res.status(400).send({ message: "update failed:" + err.message });
  }
});