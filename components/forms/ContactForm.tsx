"use client";

import InputBox from "@/components/ui/InputBox";
import TextArea from "@/components/ui/TextArea";
import EventButton from "@/components/ui/EventButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TContactSchema, contactSchema } from "@/libs/zod";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContactSchema>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: TContactSchema) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-24 py-6 flex flex-col gap-4"
    >
      <InputBox
        inputRegister={register("name")}
        label="Your name"
        htmlFor="name"
        inputType="text"
        error={
          errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )
        }
      />
      <InputBox
        inputRegister={register("email")}
        label="Your email"
        htmlFor="email"
        inputType="email"
        error={
          errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )
        }
      />
      <TextArea
        inputRegister={register("message")}
        label="Message"
        htmlFor="message"
        error={
          errors.message && (
            <p className="text-red-500">{`${errors.message.message}`}</p>
          )
        }
      />
      <EventButton
        type="button"
        text="Submit"
        classname="w-fit py-3 px-12 bg-[#272829] text-white disabled:bg-gray-300 transition"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ContactForm;
