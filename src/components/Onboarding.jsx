import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Textarea,
  Input,
} from "./index";

export default function OnBoarding() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Build your profile</h1>
        <p className="text-sm mb-8">
          Tell us a little bit about yourself — this is how others will see you
          on DEV Community. You’ll always be able to edit this later in your
          Settings.
        </p>
        <div className="flex items-center mb-6">
          <Avatar>
            <AvatarImage
              alt="profile_image"
              src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
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
