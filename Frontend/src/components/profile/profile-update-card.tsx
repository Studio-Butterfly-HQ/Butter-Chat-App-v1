import type React from "react"
import { useState } from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {Form, FormField, FormItem, FormMessage,} from "@/components/ui/form"

import { useProfileMeta, useUpdateProfile } from "@/provider/profile"
import { ProfileFormValues, profileSchema } from "@/schemas/profileSchema"

export default function ProfileUpdateCard() {
  const [profilePhoto, setProfilePhoto] = useState("/placeholder.svg?height=112&width=112")

  const { data, isLoading } = useProfileMeta()
  const { mutateAsync, isPending } = useUpdateProfile()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      category: "",
      country: "",
      language: "",
      timezone: "",
    },
    mode: "onChange",
  })

  const { watch, setValue } = form
  const values = watch()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file){
      setProfilePhoto("/placeholder.svg?height=112&width=112")
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5MB")
      return
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) =>
      setProfilePhoto(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (data: ProfileFormValues) => {
    try {
      const res = await mutateAsync({
        ...data,
        avatar: profilePhoto,
      })
    } 
    catch (error) {
      console.error("Error in profile update card: ", error);
    }
  }

  return (
    <Card className="bg-background border-0 shadow-none">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-3xl font-bold">
          Update Profile
        </CardTitle>
        <CardDescription className="text-lg">
          Add additional info to complete your profile
        </CardDescription>

        <div className="relative mt-8 mb-4">
          <Avatar className="h-36 mt-2 w-36">
            <AvatarImage src={profilePhoto} className="h-full w-full object-cover"/>
            <AvatarFallback>YN</AvatarFallback>
          </Avatar>

          <label
            htmlFor="photo-upload"
            className="absolute bottom-4 right-0 bg-blue-500 rounded-full p-2 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">Your Name</FieldLabel>
                    <Input {...field} placeholder="Joh Doe" />
                  </Field>
                  <FormMessage className="text-sm"/>
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base" >Company Category</FieldLabel>
                    <Select
                      value={values.category}
                      onValueChange={(v) =>
                        setValue("category", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={() => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">Country</FieldLabel>
                    <Select
                      value={values.country}
                      onValueChange={(v) =>
                        setValue("country", v)
                      }
                    >
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue
                          placeholder={
                            isLoading
                              ? "Loading countries..."
                              : "Select a country..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.countries.map((c) => (
                          <SelectItem
                            key={c.value}
                            value={c.value}
                          >
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm"/>
                </FormItem>
              )}
            />

            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              render={() => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">Language</FieldLabel>
                    <Select
                      value={values.language}
                      onValueChange={(v) =>
                        setValue("language", v)
                      }
                    >
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue
                          placeholder={
                            isLoading
                              ? "Loading languages..."
                              : "Select a language..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.languages.map((l) => (
                          <SelectItem
                            key={l.value}
                            value={l.value}
                          >
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm"/>
                </FormItem>
              )}
            />

            {/* Timezone */}
            <FormField
              control={form.control}
              name="timezone"
              render={() => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">Timezone</FieldLabel>
                    <Select
                      value={values.timezone}
                      onValueChange={(v) =>
                        setValue("timezone", v)
                      }
                    >
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue
                          placeholder={
                            isLoading
                              ? "Loading timezones..."
                              : "Select a timezone..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.timezones.map((t) => (
                          <SelectItem
                            key={t.value}
                            value={t.value}
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm"/>
                </FormItem>
              )}
            />

          </CardContent>

          <CardFooter>
            <Button
              className="w-full font-medium"
              disabled={isLoading || isPending}
              type="submit"
            >
              {isPending ? <> <Spinner /> Please wait... </>: <> Complete Profile </>}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
