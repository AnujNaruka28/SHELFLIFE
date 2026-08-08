import connectDB from "../config/db.js";
import User from "../models/User.js";
import HouseHold from "../models/HouseHold.js";
import Item from "../models/Item.js";
import bcrypt from "bcryptjs";
import usersData from "./users-seed.json" with { type: "json" };
import itemsData from "./items-seed.json" with { type: "json" };

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("Cleared existing users");

    const hashedUsers = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
        profileImage: {
          secure_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
        }
      }))
    );

    const users = await User.insertMany(hashedUsers);
    console.log("Users seeded successfully:", users.length);
    return users;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

const seedHousehold = async (users: any[]) => {
  try {
    await HouseHold.deleteMany({});
    console.log("Cleared existing households");

    const adminUser = users.find((user) => user.email === "anujnaruka28@gmail.com");
    if (!adminUser) {
      throw new Error("Admin user not found");
    }

    const household = await HouseHold.create({
      name: "Naruka Household",
      inviteCode: "XKPJMJ",
      members: users.map((user) => user._id),
      wasteScore: 0,
    });

    // Update all users with householdId and role
    await User.updateMany(
      { _id: { $in: users.map((user) => user._id) } },
      { householdId: household._id, role: "member" }
    );

    // Set admin role for the creator
    await User.findByIdAndUpdate(adminUser._id, { role: "admin" });

    console.log("Household seeded successfully with invite code: XKPJMJ");
    return household;
  } catch (error) {
    console.error("Error seeding household:", error);
    throw error;
  }
};

const seedItems = async (household: any, users: any[]) => {
  try {
    await Item.deleteMany({});
    console.log("Cleared existing items");

    const adminUser = users.find((user) => user.email === "anujnaruka28@gmail.com");
    if (!adminUser) {
      throw new Error("Admin user not found");
    }

    // Create email to user ID mapping
    const userMap = new Map();
    users.forEach((user) => {
      userMap.set(user.email, user._id);
    });

    const itemsWithRefs = itemsData.map((item) => {
      const addedBy = item.addedByEmail ? userMap.get(item.addedByEmail) : adminUser._id;
      const usedBy = item.usedByEmail ? userMap.get(item.usedByEmail) : null;
      const wastedBy = item.wastedByEmail ? userMap.get(item.wastedByEmail) : null;

      // Remove email fields from item data
      const { addedByEmail, usedByEmail, wastedByEmail, ...itemData } = item;

      return {
        ...itemData,
        householdId: household._id,
        addedBy: addedBy || adminUser._id,
        updatedBy: addedBy || adminUser._id,
        usedBy: usedBy,
        wastedBy: wastedBy,
      };
    });

    const items = await Item.insertMany(itemsWithRefs);
    console.log("Items seeded successfully:", items.length);
    return items;
  } catch (error) {
    console.error("Error seeding items:", error);
    throw error;
  }
};

const runSeed = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    const users = await seedUsers();
    const household = await seedHousehold(users);
    await seedItems(household, users);

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();

export { seedUsers, seedHousehold, seedItems };
