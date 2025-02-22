import { type FC, useState } from "react";
import * as S from "./styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/Form/components/Input";
import { Button } from "@components/Button";
import { FadeIn } from "@utils/animations/FadeIn";

export const Newsletter: FC = () => {
    const [addressSend, setAddressSend] = useState(false);

    const schema = z.object({
        fullName: z.string().min(1, { message: "Full name is required" }),
        phoneNumber: z.string().min(1, { message: "Phone number is required" }),
        address: z.string().min(1, { message: "Address is required" }),
    });

    const newsletterForm = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            address: "",
        },
    });

    const formSubmit = newsletterForm.handleSubmit(async (values) => {
        const formData = new FormData();
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
        formData.append("fullName", values.fullName);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    setAddressSend(true);
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                newsletterForm.reset();
            });
    });

    return (
        <S.NewsletterStyled>
            {!addressSend ? (
                <FadeIn>
                    <S.NewsletterFormStyled onSubmit={formSubmit}>
                        <h2>
                            Contact us :
                        </h2>
                        <S.NewsletterFormWrapper>
                            <Input
                                type="text"
                                placeholder="Full Name *"
                                register={newsletterForm.register("fullName")}
                                error={
                                    newsletterForm.formState.errors.fullName
                                        ?.message
                                }
                            />
                            <br />
                            <Input
                                type="text"
                                placeholder="Phone Number *"
                                register={newsletterForm.register("phoneNumber")}
                                error={
                                    newsletterForm.formState.errors.phoneNumber
                                        ?.message
                                }
                            />
                            <br />
                            <Input
                                type="text"
                                placeholder="Address *"
                                register={newsletterForm.register("address")}
                                error={
                                    newsletterForm.formState.errors.address
                                        ?.message
                                }
                            />
                            <br />
                            <Button
                                asButton={true}
                                variant="secondary"
                                type="submit"
                            >
                                Send
                            </Button>
                        </S.NewsletterFormWrapper>
                    </S.NewsletterFormStyled>
                </FadeIn>
            ) : (
                <S.NewsletterThankYou>
                    Thank you for your message! I will get back to you as soon
                    as possible
                </S.NewsletterThankYou>
            )}
        </S.NewsletterStyled>
    );
};
