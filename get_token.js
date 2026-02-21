import mongoose from 'mongoose';

const uri = "mongodb+srv://berglin1998_db_user:ln65h8NAaOJ3GM9Y@cluster0.antpotz.mongodb.net/?appName=Cluster0";

async function getUsers() {
  await mongoose.connect(uri);
  const db = mongoose.connection.useDb('test');
  const users = db.collection('users');
  const allUsers = await users.find({}).toArray();
  console.log("All Users:", allUsers.map(u => ({ email: u.email, role: u.role, isApproved: u.isApproved })));
  process.exit(0);
}

getUsers();
