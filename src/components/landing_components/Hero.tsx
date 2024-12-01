import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTranslation } from 'react-i18next';


// Styled components cho carousel
const Card = styled(Box)(() => ({
  width: "300px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  position: "relative",
  backgroundColor: "#fff",
  marginRight: "16px",
  marginBottom: "16px",
  cursor: "pointer",
  flexShrink: 0,
  textAlign: "center",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 4px 20px rgba(173, 216, 230, 0.9)",
  },
}));

interface HeroProps {
  scrollToFooter: () => void;
}

const CardImage = styled(Box)({
  height: "180px",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const CarouselWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const Carousel = styled(Box)({
  display: "flex",
  transition: "transform 0.5s ease-in-out", // Hiệu ứng chuyển động mượt
});

export default function Hero({ scrollToFooter }: HeroProps) {
  const { t } = useTranslation();
  const sentences = [
    "Welcome to EduTrack 🎉",
    "Manage Your Learning",
    "Ace Your Exams!",
    "Stay Organized",
    "Monitor Progress",
    "Achieve Goals",
  ];
  const [displayedText, setDisplayedText] = React.useState("");
  const [sentenceIndex, setSentenceIndex] = React.useState(0);

  const courses = [
    {
      id: 1,
      title: "Track Your Progress",
      description: "Personalized dashboards to keep track of learning progress.",
      image: "https://www.shutterstock.com/image-photo/business-concept-attached-board-announcement-260nw-2160920239.jpg",
    },
    {
      id: 2,
      title: "Plan Your Studies",
      description: "Effective study plans tailored to your goals.",
      image: "https://www.shutterstock.com/image-photo/steps-education-leading-success-goal-600nw-2309134389.jpg",
    },
    {
      id: 3,
      title: "Exam Preparation",
      description: "Access tools and resources to prepare for exams.",
      image: "https://www.shutterstock.com/image-vector/exam-preparation-school-test-vector-260nw-1956280858.jpg",
    },
    {
      id: 4,
      title: "Collaborate with Peers",
      description: "Join study groups and share knowledge with classmates.",
      image: "https://www.shutterstock.com/image-photo/group-young-people-thinking-together-260nw-1185545020.jpg",
    },
    {
      id: 5,
      title: "Track Your Progress",
      description: "Personalized dashboards to keep track of learning progress.",
      image: "https://www.shutterstock.com/image-photo/business-concept-attached-board-announcement-260nw-2160920239.jpg",
    },
    {
      id: 6,
      title: "Plan Your Studies",
      description: "Effective study plans tailored to your goals.",
      image: "https://www.shutterstock.com/image-photo/steps-education-leading-success-goal-600nw-2309134389.jpg",
    },
    {
      id: 7,
      title: "Exam Preparation",
      description: "Access tools and resources to prepare for exams.",
      image: "https://www.shutterstock.com/image-vector/exam-preparation-school-test-vector-260nw-1956280858.jpg",
    },
    {
      id: 8,
      title: "Collaborate with Peers",
      description: "Join study groups and share knowledge with classmates.",
      image: "https://www.shutterstock.com/image-photo/group-young-people-thinking-together-260nw-1185545020.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const extendedCards = [...courses, ...courses];

  const cardWidth = 316;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= courses.length) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let index = 0;
    const fullText = sentences[sentenceIndex];
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [sentenceIndex]);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={4}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" }, marginBottom: "2rem" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            {displayedText}
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: "10px",
                height: "1.5rem",
                backgroundColor: "currentColor",
                animation: "blink 1s step-end infinite",
                ml: 0.5,
              }}
            />
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            <strong>Simplify learning and exam management with EduTrack. Stay organized,
              monitor progress, and achieve your academic goals effortlessly through
              our intuitive dashboard.</strong>
          </Typography>
          <Typography>
            <strong>{t("hero.getStarted")}</strong>{" "}
            <Box
              component="span"
              sx={{ color: "primary.main", cursor: "pointer", textDecoration: "underline", fontSize: "1.1rem" }}
              onClick={scrollToFooter}
            >
              {t("hero.getStartedLink")}
            </Box>
          </Typography>

        </Stack>

        {/* Carousel Section */}
        <CarouselWrapper sx={{ marginTop: "1.5rem" }}>
          <Carousel
            sx={{
              width: `${extendedCards.length * cardWidth}px`,
              transform: `translateX(-${currentIndex * cardWidth}px)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {extendedCards.map((card, index) => (
              <Card key={index}>
                <CardImage
                  sx={{
                    backgroundImage: `url(${card.image})`,
                  }}
                />
                <Box sx={{ padding: "16px" }}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Carousel>
        </CarouselWrapper>
      </Container>
    </Box>
  );
}
