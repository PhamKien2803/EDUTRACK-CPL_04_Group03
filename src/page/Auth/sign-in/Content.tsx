import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

// Content items for features
const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Personalized Learning Experience',
    description:
      'EduTrack tailors resources and schedules based on your study needs, maximizing productivity and focus.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Comprehensive Tracking',
    description:
      'Easily track and manage your assignments, exams, and study sessions, ensuring you stay on top of your goals.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'User-Friendly Interface',
    description:
      'EduTrack’s intuitive interface helps you manage your tasks effortlessly, so you can focus on learning.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Smart Study Insights',
    description:
      'Get insights into your study habits and performance, helping you continuously improve and achieve success.',
  },
];

// Introductory sentences
const sentences = [
  'Welcome to EduTrack !!',
  'Your companion for organized learning.',
  'Track your progress with ease.',
  'Achieve your study goals with EduTrack.'
];

export default function Content() {
  const [displayedText, setDisplayedText] = React.useState('');
  const [sentenceIndex, setSentenceIndex] = React.useState(0);

  // Typing effect for introductory text
  React.useEffect(() => {
    let index = 0;
    const fullText = sentences[sentenceIndex]; // Get the current sentence
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval); // Stop typing when done
        setTimeout(() => {
          setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length); // Move to next sentence
        }, 1000); // Delay before switching
      }
    }, 150); // Speed of typing effect

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [sentenceIndex]); // Dependency array to trigger effect when sentenceIndex changes

  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: 'clamp(1rem, 1.5vw, 2rem)',
            color: 'text.secondary',
            textAlign: 'center',
            minHeight: '40px',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {displayedText}
        </Typography>
      </Box>

      {items.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          sx={{
            gap: 2,
            p: 2,
            borderRadius: 2,
            transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
