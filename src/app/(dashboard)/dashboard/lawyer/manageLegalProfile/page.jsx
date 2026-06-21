"use client";

import { addProfile } from "@/lib/api/lawyer/action";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

export default function ProfilePage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
    // Convert FormData to plain object

    const userData = {
      ...user,
    };
    const resData = await addProfile(userData);
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
      <Surface className="w-full min-w-[380px]">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>
            <Description>Update your profile information.</Description>
            <Fieldset.Group>
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }

                  return null;
                }}
              >
                <Label>Name</Label>
                <Input placeholder="John Doe" variant="secondary" />
                <FieldError />
              </TextField>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>
              <TextField isRequired name="image" type="url">
                <Label>ImageUrl</Label>
                <Input placeholder="Image url..." variant="secondary" />
                <FieldError />
              </TextField>
              {/* <TextField isRequired name="text" type="text">
                <Label>Specialization</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField> */}
              <div>
                <Label>Specialization</Label>

                <Select
                  name="specialization"
                  isRequired
                  className="w-full"
                  placeholder="Specialization"
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Corporate Law">
                        Corporate Law
                      </ListBox.Item>
                      <ListBox.Item id="Criminal Law">
                        Criminal Law
                      </ListBox.Item>
                      <ListBox.Item id="Family Law">Family Law</ListBox.Item>
                      <ListBox.Item id="Property Law">
                        Property Law
                      </ListBox.Item>
                      <ListBox.Item id="Tax Law">Tax Law</ListBox.Item>
                      <ListBox.Item id="Cyber Law">Cyber Law</ListBox.Item>
                      <ListBox.Item id="Immigration Law">
                        Immigration Law
                      </ListBox.Item>
                      <ListBox.Item id="Civil Law">Civil Law</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <TextField isRequired name="bio">
                <Label>Bio</Label>
                <TextArea
                  placeholder="Tell us about yourself..."
                  variant="secondary"
                />
                <Description>Minimum 10 characters</Description>
                <FieldError />
              </TextField>
              <TextField isRequired name="fee" type="text">
                <Label>Fee</Label>
                <Input placeholder="Fee..." variant="secondary" />
                <FieldError />
              </TextField>
              {/* <TextField isRequired name="status" type="text">
                <Label>Status</Label>
                <Input placeholder="Status..." variant="secondary" />
                <FieldError />
              </TextField> */}
              <div>
                <Label>Status</Label>

                <Select
                  name="status"
                  isRequired
                  className="w-full"
                  placeholder="Status..."
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="available">Available</ListBox.Item>
                      <ListBox.Item id="busy">busy</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              {/* <TextField isRequired name="location" type="text">
                <Label>Location</Label>
                <Input placeholder="Location..." variant="secondary" />
                <FieldError />
              </TextField> */}
              <div>
                <Label>Location</Label>

                <Select
                  name="location"
                  isRequired
                  className="w-full"
                  placeholder="Location..."
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="dhaka">Dhaka</ListBox.Item>
                      <ListBox.Item id="Chattogram">Chattogram</ListBox.Item>
                      <ListBox.Item id="Rajshahi">Rajshahi</ListBox.Item>
                      <ListBox.Item id="Sylhet">Sylhet</ListBox.Item>
                      <ListBox.Item id="Khulna">Khulna</ListBox.Item>
                      <ListBox.Item id="Barishal">Barishal</ListBox.Item>
                      <ListBox.Item id="Cumilla">Cumilla</ListBox.Item>
                      <ListBox.Item id="Mymensingh">Mymensingh</ListBox.Item>
                      <ListBox.Item id="Rangpur">Rangpur</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <TextField isRequired name="experience" type="text">
                <Label>Experience</Label>
                <Input placeholder="Experience" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>
            <Fieldset.Actions>
              <Button type="submit">
                <FloppyDisk />
                Save changes
              </Button>
              <Button type="reset" variant="tertiary">
                Cancel
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}
