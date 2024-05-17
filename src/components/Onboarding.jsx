import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { Avatar, AvatarImage, Button, Textarea, Input } from "./index";

export default function OnBoarding() {
  // const userDetails = useSelector((state) => state.auth.userData);
  // console.log(userDetails);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-9/12">
        <h1 className="text-3xl font-bold mb-6">Build your profile</h1>
        <p className="text-sm mb-8">
          Tell us a little bit about yourself — this is how others will see you
          on BlogApp. You’ll always be able to edit this later in your Profile
          Section
        </p>
        <div className="flex items-center mb-6 gap-5">
          <Avatar>
            <AvatarImage
              alt="profile_image"
              // src=""
              // src={authService.getProfilePreview(userDetails.profileImg)}
            />
          </Avatar>
          <div className="mt-2 text-center">
            <div className="font-semibold">Rainbow English School</div>
            <Button className="mt-1" variant="outline">
              Edit profile image
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <Input id="username" placeholder="rainbow_englishschool_94" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio">Bio</label>
            <Textarea
              className="min-h-[100px]"
              id="bio"
              placeholder="Tell us a little about yourself"
            />
            <div className="text-right text-sm text-gray-500 mt-1">0/200</div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
}
