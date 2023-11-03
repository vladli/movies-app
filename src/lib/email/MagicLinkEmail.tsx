import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "./react-email";

type Props = {
  url?: string;
};

export default function MagicLinkEmail({ url }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Magic Link from Movie App</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                alt="Logo"
                className="mx-auto my-0"
                src="https://movie-app.vladli.dev/logo.png"
                width={200}
              />
            </Section>

            <Text className="text-[14px] font-medium leading-[24px] text-black">
              Hello, click the button bellow to sign in.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] p-4 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Sign In
              </Button>
            </Section>
            <Text className="text-[14px] font-medium leading-[24px] text-black">
              If you didn&apos;t try to login, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
