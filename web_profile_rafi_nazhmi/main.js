const certifications = [
    "Membuat Rangkaian Power Supply",
    "Melakukan Instalasi dan Pengujian Jaringan LAN",
    "Terminasi Kabel PCM Pada Terminal DDF K52",
    "Pemodelan Pointing VSAT Satelite",
    "Perancangan dan Analisis Link Komunikasi Radio-Microwave dengan Pathloss 5.1"
  ];
  
  const skills = [
    "Instalasi dan pengujian jaringan LAN",
    "Pointing antenna VSAT",
    "Penyambungan kabel Fiber Optic",
    "Activity Diagram & ERD",
    "Database MySQL",
    "Aplikasi mobile dengan Dart"
  ];
  
  const softwares = [
    "Microsoft Word, Excel, PowerPoint",
    "MySQL",
    "Python",
    "Visual Studio Code"
  ];
  
  const education = [
    "Universitas Mercu Buana (2022 – Sekarang), Sistem Informasi",
    "SMK Telkom Jakarta (2018 – 2021)",
    "SMP Al-Chasanah (2015 – 2018)",
    "SDN TDU 06 Pagi (2008 – 2015)"
  ];
  
  function renderList(id, items) {
    const ul = document.getElementById(id);
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
  
  renderList("certifications", certifications);
  renderList("skills", skills);
  renderList("softwares", softwares);
  renderList("education", education);
  