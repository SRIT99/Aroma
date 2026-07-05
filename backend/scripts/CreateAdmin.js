#!/usr/bin/env node
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const readline = require("readline");
const AdminService = require("../src/services/adminService");
const Database = require("../src/config/database");
const logger = require("../src/utils/logger");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => {
    rl.question(query, resolve);
  });

const createAdmin = async () => {
  try {
    console.log("\n🔐 AROMA RESTAURANT - ADMIN CREATION\n");
    console.log("=====================================\n");

    await Database.connect();

    const name = await question("Enter admin name: ");
    const email = await question("Enter admin email: ");
    const phone = await question("Enter admin phone (10 digits): ");
    const password = await question("Enter admin password (min 6 chars): ");

    console.log("\n📋 Admin Details:");
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Phone: ${phone}`);
    console.log(`   Password: ${"*".repeat(password.length)}`);

    const confirm = await question("\nCreate admin? (yes/no): ");

    if (confirm.toLowerCase() !== "yes") {
      console.log("\n❌ Admin creation cancelled");
      process.exit(0);
    }

    const admin = await AdminService.createAdmin({
      name,
      email,
      phone,
      password,
      isVerified: true,
    });

    console.log("\n✅ Admin created successfully!");
    console.log("=====================================");
    console.log(`   ID: ${admin._id}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log("=====================================\n");
    console.log("You can now login with these credentials.");

    process.exit(0);
  } catch (error) {
    logger.error(`Admin creation failed: ${error.message}`);
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

createAdmin();
