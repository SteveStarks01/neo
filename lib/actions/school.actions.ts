'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_SCHOOL_COLLECTION_ID: SCHOOL_COLLECTION_ID,
} = process.env;

export const registerSchool = async (schoolData: any) => {
  try {
    const { account, database } = await createAdminClient();

    // Create school account
    const schoolAccount = await account.create(
      ID.unique(),
      schoolData.email,
      schoolData.password,
      schoolData.name
    );

    if (!schoolAccount) throw new Error('Error creating school account');

    // Create school document
    const school = await database.createDocument(
      DATABASE_ID!,
      SCHOOL_COLLECTION_ID!,
      ID.unique(),
      {
        name: schoolData.name,
        email: schoolData.email,
        address: schoolData.address,
        accountNumber: schoolData.accountNumber,
        bankName: schoolData.bankName,
        userId: schoolAccount.$id
      }
    );

    // Create session
    const session = await account.createEmailPasswordSession(
      schoolData.email,
      schoolData.password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return school;
  } catch (error) {
    console.error('Error registering school:', error);
    throw error;
  }
}

export const getSchoolInfo = async () => {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const { database } = await createAdminClient();
    const school = await database.listDocuments(
      DATABASE_ID!,
      SCHOOL_COLLECTION_ID!,
      [{
        field: 'userId',
        operator: 'equal',
        value: result.$id
      }]
    );

    if (school.total === 0) return null;

    return school.documents[0];
  } catch (error) {
    console.error('Error getting school info:', error);
    return null;
  }
}