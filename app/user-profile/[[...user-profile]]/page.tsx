"use client";
 
import { UserProfile } from "@clerk/nextjs";
import PlusIcon from "../../projects/icons/PlusIcon";
import { CustomProfilePage } from "./CustomPage";
 

const UserProfilePage = () => (
  <UserProfile path="/user-profile" routing="path">
    <UserProfile.Page label="Custom Page" labelIcon={<PlusIcon />} url="custom-page">
        <CustomProfilePage />
    </UserProfile.Page>
    <UserProfile.Page label="account" />
    <UserProfile.Page label="security" />
  </UserProfile>
);
 
export default UserProfilePage;