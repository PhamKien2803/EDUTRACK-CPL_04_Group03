import { useTranslation } from "react-i18next";
function LecturersGuide() {
  const { t } = useTranslation();
  return (
    <div>
      <h2 style={{
        fontSize: '2rem',
        color: '#2c3e50',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        textTransform: 'uppercase',
        padding: '10px'
      }}>{t("teacher_guide")}</h2>
      <embed
        src="/Huong_dan_tren_EduTrack_2024Giao_vien.pdf"
        width="100%"
        height="600px"
        type="application/pdf"
      />
    </div>
  );
}

export default LecturersGuide;
