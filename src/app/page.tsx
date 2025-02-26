"use client";

import "@melloware/coloris/dist/coloris.css";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Adjust the path
import { normalHtmlTemplate } from "@/template/first-template/normal-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import Image from "next/image";
import ImageHolder from "@/components/ImageHolder";

type FormData = {
  bg: string;
  landscape: File | null;
  portrait: File | null;
  cta: File | null;
  fileName: string;
  template: string;
};

const fileToBase64 = (file: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function Home() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [template, setTemplate] = useState("first");
  const [landscapeImage, setLandscapeImage] = useState("");
  const [portraitImage, setPortraitImage] = useState("");
  const [ctaImage, setCtaImage] = useState("");

  useEffect(() => {
    import("@melloware/coloris").then((Coloris) => {
      Coloris.init();
    });
  }, []);

  const handleTemplateChange = (value: string) => {
    setValue("template", value);
    setTemplate(value);
  };

  const handleLandscapeChange = async (file: any) => {
    setValue("landscape", file || null);
    const image = await fileToBase64(file);
    setLandscapeImage(image);
  };

  const handleCTAChange = async (file: any) => {
    setValue("cta", file);
    const image = await fileToBase64(file);
    setCtaImage(image);
  };
  const handlePortraitChange = async (file: any) => {
    setValue("portrait", file || null);
    const image = await fileToBase64(file);
    setPortraitImage(image);
  };

  const pickColor = async () => {
    if (!(window as any).EyeDropper) {
      alert("EyeDropper API is not supported in this browser.");
      return;
    }
    const eyeDropper = new (window as any).EyeDropper();
    try {
      const result = await eyeDropper.open();
      console.log(result);
      setValue("bg", result.sRGBHex);
    } catch (error) {
      console.error("EyeDropper canceled", error);
    }
  };

  const onSubmit = async (values: FormData) => {
    console.log(values);
    try {
      const landscapeBase64 = await fileToBase64(values.landscape);
      const portraitBase64 = await fileToBase64(values.portrait);
      const ctaBase64 = await fileToBase64(values.cta);
      const params = {
        bg: values.bg,
        landscape: landscapeBase64,
        portrait: portraitBase64,
        cta: ctaBase64,
      };
      const html = normalHtmlTemplate(params);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const date = new Date();
      const formatted = date.toLocaleDateString("en-CA");
      a.href = url;
      a.download = `${values.fileName}_colanot_sip_${formatted}.html`;
      a.click();
    } catch (error) {
      console.error("Error converting files to base64", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <Card>
          <CardHeader>
            <CardTitle>SIP GENERATOR</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h3>Template Type</h3>
                  <Select
                    onValueChange={(value) => handleTemplateChange(value)}
                    defaultValue={template}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type of Content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type of Content</SelectLabel>
                        <SelectItem value="first">First Template</SelectItem>
                        <SelectItem value="second">Second Template</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <h3>File Name</h3>
                  <Input
                    type="text"
                    {...register("fileName")}
                    required
                    placeholder="Input your Filename"
                  />
                </div>
                <ImageHolder
                  changeHandler={handleLandscapeChange}
                  image={landscapeImage}
                  title="Landscape Image"
                />
                <ImageHolder
                  changeHandler={handlePortraitChange}
                  image={portraitImage}
                  title="Portrait Image"
                />
                <div className="flex flex-col">
                  <h3>BG COLOR</h3>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      {...register("bg")}
                      placeholder="input hex value sample #fff"
                      onChange={(e) => setValue("bg", e.target.value)}
                    />
                    <Button onClick={pickColor} type="button">
                      PICK COLOR
                    </Button>
                  </div>
                </div>
                <ImageHolder
                  changeHandler={handleCTAChange}
                  image={ctaImage}
                  title="CTA Image"
                />
                <Button type="submit">Generate</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SIP Layout Preview Sample</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="img-cont">
              <h3 className="text-center font-bold text-lg">Landscape</h3>
              <Image
                src={`/template/${template}-template/landscape.png`}
                alt="landscape"
                width={400}
                height={500}
              />
            </div>
            <div className="img-cont">
              <h3 className="text-center font-bold text-lg">Portrait</h3>
              <Image
                src={`/template/${template}-template/portrait.png`}
                alt="landscape"
                width={400}
                height={500}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
