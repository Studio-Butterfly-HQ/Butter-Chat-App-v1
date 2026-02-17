import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "@/schemas/profileSchema";
import {
  useProfileMeta,
  useUpdateCompanyProfile,
} from "@/provider/profile/profile.queries";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookOpen, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function GeneralSettings() {
  const { data: profileMeta, isLoading: isMetaLoading } = useProfileMeta();
  const { mutateAsync: updateProfile, isPending } = useUpdateCompanyProfile();

  const company = useAppSelector((state) => state.auth.company);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: company
      ? {
          company_name: company.company_name || "",
          company_category: company.company_category || "",
          country: company.country || "",
          language: company.language || "",
          timezone: company.timezone || "",
        }
      : undefined,
    mode: "onBlur",
  });

  async function onSubmit(data: ProfileFormValues) {
    // if (!form.formState.isDirty) {
    //   toast.error("No changes to save");
    //   return;
    // }
    try {
      await updateProfile(data);
      form.reset(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="flex flex-col border-b border-border md:flex-row mb-0.5 min-h-16 md:h-16 shrink-0 items-start md:items-center justify-between gap-3 md:gap-2 py-3 md:py-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full md:w-auto">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <span className="text-sm md:text-base font-semibold whitespace-nowrap">
              General Settings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 w-full md:w-auto justify-start md:justify-end overflow-x-auto">
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground rounded-full hover:bg-accent px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            <span>Learn More</span>
          </Badge>
          <Badge
            className="cursor-pointer rounded-full px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap"
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? (
              <Spinner className="h-3 w- mr-1.5" />
            ) : (
              <Save className="h-3 w-3 mr-1.5" />
            )}
            <span>{isPending ? "Saving..." : "Save Changes"}</span>
          </Badge>
        </div>
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide p-4">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">General Settings</CardTitle>
            <CardDescription>
              Please fill up all the fields with relevant information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Company Name */}
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="XYZ Corporation"
                          className="w-full h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Category */}
                <FormField
                  control={form.control}
                  name="company_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="health">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            disabled={isMetaLoading}
                            className="w-full h-10"
                          >
                            {isMetaLoading ? (
                              <span>Loading countries...</span>
                            ) : (
                              <SelectValue placeholder="Select a Country" />
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {profileMeta?.countries.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Timezone */}
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            disabled={isMetaLoading}
                            className="w-full h-10"
                          >
                            {isMetaLoading ? (
                              <span>Loading timezones...</span>
                            ) : (
                              <SelectValue placeholder="Select a Timezone" />
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {profileMeta?.timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Language */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            disabled={isMetaLoading}
                            className="w-full h-10"
                          >
                            {isMetaLoading ? (
                              <span>Loading languages...</span>
                            ) : (
                              <SelectValue placeholder="Select a Language" />
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {profileMeta?.languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
