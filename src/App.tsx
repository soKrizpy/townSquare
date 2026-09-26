import React, { useState } from 'react';
import { Header } from './components/Header';
import { TownSquareParty } from './components/TownSquareParty';
import { PetSanctuary } from './components/PetSanctuary';
import { BottomActionBar } from './components/BottomActionBar';
import { CyberQuestMap } from './components/CyberQuestMap';
import { QuestReaderModal } from './components/QuestReaderModal';
import { AvatarShopModal, SHOP_ITEMS } from './components/AvatarShopModal';
import { CoderCardModal } from './components/CoderCardModal';
import { InviteFriendModal } from './components/InviteFriendModal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ParentHub } from './components/ParentHub';
import { HomeworkCard } from './components/HomeworkCard';
import { HomeworkQuizModal } from './components/HomeworkQuizModal';
import { PetEvolutionModal } from './components/PetEvolutionModal';
import { StudentCoder, PetData, FeedDataType, AvatarItem, QuestNode, AppRole } from './types/game';
import { soundFx } from './utils/audio';

const CYBER_TOWN_BACKDROP = '/src/assets/images/cyber_town_backdrop_1790389312675.jpg';

const INITIAL_QUEST_NODES: QuestNode[] = [
  {
    id: 1,
    chapter: 1,
    title: 'Mantra Pertama: print()',
    subtitle: 'Mengeluarkan mantra kata pertama ke terminal cyber digital',
    status: 'completed',
    icon: '📜',
    xpReward: 30,
    coinReward: 20,
    dataFragmentReward: { type: 'logic', amount: 10 },
  },
  {
    id: 2,
    chapter: 2,
    title: 'Kotak Rahasia: Variabel',
    subtitle: 'Menyimpan data nama, angka energi, dan inventaris pet',
    status: 'completed',
    icon: '📦',
    xpReward: 40,
    coinReward: 25,
    dataFragmentReward: { type: 'logic', amount: 10 },
  },
  {
    id: 3,
    chapter: 3,
    title: 'Gerbang Logika: If-Else',
    subtitle: 'Membuat keputusan cerdas untuk membuka pintu sirkuit terkunci',
    status: 'active',
    icon: '⚔️',
    xpReward: 50,
    coinReward: 30,
    dataFragmentReward: { type: 'logic', amount: 15 },
  },
  {
    id: 4,
    chapter: 4,
    title: 'Operator Sakti: Perbandingan',
    subtitle: 'Menguji kesamaan dan batas nilai dengan operator ==, !=, >, dan <',
    status: 'locked',
    icon: '⚖️',
    xpReward: 55,
    coinReward: 35,
    dataFragmentReward: { type: 'logic', amount: 15 },
  },
  {
    id: 5,
    chapter: 5,
    title: 'Perulangan Loop: For Loop',
    subtitle: 'Mengulang aksi animasi robot ratusan kali dalam sekejap mata',
    status: 'locked',
    icon: '🔄',
    xpReward: 60,
    coinReward: 40,
    dataFragmentReward: { type: 'logic', amount: 20 },
  },
  {
    id: 6,
    chapter: 6,
    title: 'Perulangan Cerdas: While Loop',
    subtitle: 'Berjalan dinamis selama energi baterai robot masih menyala',
    status: 'locked',
    icon: '🌀',
    xpReward: 65,
    coinReward: 40,
    dataFragmentReward: { type: 'creative', amount: 20 },
  },
  {
    id: 7,
    chapter: 7,
    title: 'Gudang Data: List & Array',
    subtitle: 'Menampung inventaris koleksi item dalam satu wadah kode',
    status: 'locked',
    icon: '🎒',
    xpReward: 70,
    coinReward: 45,
    dataFragmentReward: { type: 'creative', amount: 20 },
  },
  {
    id: 8,
    chapter: 8,
    title: 'Peta Koordinat: Dictionary',
    subtitle: 'Menghubungkan kunci sandi dengan koordinat 3D di peta game',
    status: 'locked',
    icon: '🗺️',
    xpReward: 75,
    coinReward: 50,
    dataFragmentReward: { type: 'spatial', amount: 20 },
  },
  {
    id: 9,
    chapter: 9,
    title: 'Fungsi Ajaib: def()',
    subtitle: 'Membungkus mantra kode menjadi jurus modular yang bisa dipanggil ulang',
    status: 'locked',
    icon: '⚡',
    xpReward: 80,
    coinReward: 55,
    dataFragmentReward: { type: 'logic', amount: 25 },
  },
  {
    id: 10,
    chapter: 10,
    title: 'Mendeteksi Bug: Try-Except',
    subtitle: 'Perisai pelindung algoritma agar game tidak crash saat terjadi eror',
    status: 'locked',
    icon: '🛡️',
    xpReward: 85,
    coinReward: 60,
    dataFragmentReward: { type: 'logic', amount: 25 },
  },
  {
    id: 11,
    chapter: 11,
    title: 'Modul Rahasia: Random & Math',
    subtitle: 'Menambahkan simulasi dadu keberuntungan dan fisika pantulan',
    status: 'locked',
    icon: '🎲',
    xpReward: 90,
    coinReward: 65,
    dataFragmentReward: { type: 'spatial', amount: 25 },
  },
  {
    id: 12,
    chapter: 12,
    title: 'Boss Project: Robot Pet Game',
    subtitle: 'Rakit game interaktif virtual pet utuh dengan sistem UI visual!',
    status: 'locked',
    icon: '👑',
    xpReward: 150,
    coinReward: 100,
    dataFragmentReward: { type: 'spatial', amount: 35 },
    isBoss: true,
  },
];

export default function App() {
  // --- Phase 3 Role State: [student | teacher | parent] ---
  const [activeRole, setActiveRole] = useState<AppRole>('student');

  // --- Student Navigation View (Town Square vs Quest Map) ---
  const [currentView, setCurrentView] = useState<'town_square' | 'quest_map'>('town_square');

  // --- Synergy Loop States ---
  const [isMeetingCompleted, setIsMeetingCompleted] = useState<boolean>(false);
  const [isHomeworkDone, setIsHomeworkDone] = useState<boolean>(false);
  const [teacherNote, setTeacherNote] = useState<string>(
    'Semua siswa aktif memahami logika percabangan koding dengan sangat baik!'
  );

  // --- Modals State ---
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [selectedCoder, setSelectedCoder] = useState<StudentCoder | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [activeQuestForReader, setActiveQuestForReader] = useState<QuestNode | null>(null);

  // --- Game Economy State ---
  const [coins, setCoins] = useState<number>(250);
  const [inventory, setInventory] = useState<string[]>([]);
  const [equippedHatId, setEquippedHatId] = useState<string | null>(null);

  // --- Audio State ---
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // --- Quest Nodes State ---
  const [questNodes, setQuestNodes] = useState<QuestNode[]>(INITIAL_QUEST_NODES);

  // --- Pet State ---
  const [pet, setPet] = useState<PetData>({
    name: 'Bit-Mon',
    stage: 'EGG',
    hatchProgress: 65,
    logicData: 35,
    creativeData: 20,
    spatialData: 10,
  });

  // --- Students State ---
  const [students, setStudents] = useState<StudentCoder[]>([
    {
      id: 'hero',
      name: 'Kamu (Hero)',
      role: 'Apprentice Coder',
      status: 'online',
      isUser: true,
      equippedHatId: null,
      grade: 'Kelas 5 SD',
      bio: 'Suka eksplorasi kode Python dan membuat robot virtual di bits2bytes! Siap menuntaskan Chapter 3.',
      favoriteLanguages: [
        { name: 'Python', level: 'Tingkat Dasar', color: '#06b6d4' },
        { name: 'Scratch', level: 'Mahir', color: '#f59e0b' },
      ],
      xp: 420,
      level: 3,
      streakDays: 4,
      recentProject: {
        title: 'Kalkulator Energi Robot',
        description: 'Aplikasi interaktif penghitung konsumsi baterai drone cyber.',
        tech: 'Python 3',
        codeSnippet: `def hitung_energi(jarak_km):\n    konsumsi = jarak_km * 1.5\n    return f"Baterai tersisa: {100 - konsumsi}%"`,
      },
    },
    {
      id: 'rian',
      name: 'Rian',
      role: 'Junior Hacker',
      status: 'online',
      isUser: false,
      equippedHatId: 'tudung-wizard',
      grade: 'Kelas 6 SD',
      bio: 'Paling hobi debugging kode game labirin dan mengumpulkan artefak rune digital!',
      favoriteLanguages: [
        { name: 'Python', level: 'Menengah', color: '#06b6d4' },
        { name: 'C++', level: 'Eksplorasi', color: '#a855f7' },
      ],
      xp: 680,
      level: 5,
      streakDays: 7,
      recentProject: {
        title: 'Maze Runner: Cyber Escape',
        description: 'Game logika labirin 2D dengan algoritma pencarian rute BFS.',
        tech: 'Python Pygame',
        codeSnippet: `if pos_pemain == gerbang_keluar:\n    print("Selamat! Pintu Cyber Terbuka!")`,
      },
    },
    {
      id: 'siti',
      name: 'Siti',
      role: '3D Sculptor',
      status: 'offline',
      isUser: false,
      equippedHatId: null,
      grade: 'Kelas 7 SMP',
      bio: 'Spesialis modeling objek 3D low-poly Blender dan tekstur anime cyber.',
      favoriteLanguages: [
        { name: 'Blender 3D', level: 'Mahir', color: '#3b82f6' },
        { name: 'HTML/CSS', level: 'Menengah', color: '#ec4899' },
      ],
      xp: 590,
      level: 4,
      streakDays: 3,
      recentProject: {
        title: 'Hologram Cyber-Dragon Low-Poly',
        description: 'Model 3D naga digital siap rigging untuk game guild.',
        tech: 'Blender 3D / GLTF',
      },
    },
  ]);

  // Keep Hero's equippedHatId synchronized
  const displayedStudents = students.map((s) => {
    if (s.isUser) {
      return { ...s, equippedHatId };
    }
    return s;
  });

  // Audio mute toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
  };

  // Wardrobe Purchase Handler
  const handleBuyItem = (item: AvatarItem): boolean => {
    if (coins < item.price) return false;
    setCoins((prev) => prev - item.price);
    setInventory((prev) => [...prev, item.id]);
    return true;
  };

  // Wardrobe Equip Handler
  const handleEquipItem = (itemId: string | null) => {
    setEquippedHatId(itemId);
  };

  // Pet Feed Handler
  const handleFeedPet = (type: FeedDataType) => {
    setPet((prev) => {
      const nextHatch = Math.min(100, prev.hatchProgress + 15);
      const isNowHatched = nextHatch >= 100 && prev.stage !== 'BABY_DIGIMON';

      return {
        ...prev,
        hatchProgress: nextHatch,
        stage: isNowHatched ? 'HATCHING' : prev.stage,
        logicData: type === 'logic' ? prev.logicData + 15 : prev.logicData,
        creativeData: type === 'creative' ? prev.creativeData + 15 : prev.creativeData,
        spatialData: type === 'spatial' ? prev.spatialData + 15 : prev.spatialData,
      };
    });
  };

  // Pet Rename Handler
  const handleRenamePet = (newName: string) => {
    setPet((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  // Teacher Completes Meeting Action
  const handleCompleteMeeting = (note: string) => {
    setIsMeetingCompleted(true);
    setTeacherNote(note);
  };

  // Parent Sends Love Bonus (+10 coins)
  const handleSendParentLove = () => {
    setCoins((prev) => prev + 10);
  };

  // Student Completes Homework Quiz Action (Triggers Pet Hatching Climax)
  const handleHomeworkComplete = () => {
    setIsHomeworkDone(true);
    setIsQuizModalOpen(false);

    // Add final +25 Logic Data to pet, reaching 100%
    setPet((prev) => ({
      ...prev,
      hatchProgress: 100,
      logicData: prev.logicData + 25,
      stage: 'HATCHING',
    }));

    // Trigger the Epic Evolution Climax Modal!
    setTimeout(() => {
      setIsEvolutionModalOpen(true);
    }, 400);
  };

  // Pet Evolution Acknowledged: Egg transforms into Cyber-Byte Pup!
  const handleAcknowledgeHatch = () => {
    // 1. Reward +100 bonus Edu-Coins
    setCoins((prev) => prev + 100);

    // 2. Transform Pet to Baby Digimon
    setPet((prev) => ({
      ...prev,
      stage: 'BABY_DIGIMON',
      name: 'Cyber-Byte Pup',
      hatchProgress: 100,
    }));

    // 3. Update Hero's honorary title in bio & role
    setStudents((prev) =>
      prev.map((s) => {
        if (s.isUser) {
          return {
            ...s,
            role: 'Master of Logic',
            bio: 'Master of Logic bersertifikat! Berhasil menetaskan kompanion Cyber-Byte Pup dan menuntaskan modul If-Else.',
            xp: s.xp + 100,
          };
        }
        return s;
      })
    );
  };

  // Quest Completion Handler (From Mimo-style Quest Reader)
  const handleClaimQuestReward = (completedQuestId: number) => {
    const targetQuest = questNodes.find((q) => q.id === completedQuestId);
    if (!targetQuest) return;

    // 1. Reward Coins
    setCoins((prev) => prev + targetQuest.coinReward);

    // 2. Reward Pet Logic Data & Hatch progress
    setPet((prev) => {
      const nextHatch = Math.min(100, prev.hatchProgress + targetQuest.dataFragmentReward.amount);
      return {
        ...prev,
        hatchProgress: nextHatch,
        stage: nextHatch >= 100 && prev.stage !== 'BABY_DIGIMON' ? 'HATCHING' : prev.stage,
        logicData: prev.logicData + targetQuest.dataFragmentReward.amount,
      };
    });

    // 3. Update Hero's XP
    setStudents((prev) =>
      prev.map((s) => {
        if (s.isUser) {
          const nextXp = s.xp + targetQuest.xpReward;
          const nextLevel = Math.floor(nextXp / 150) + 1;
          return { ...s, xp: nextXp, level: nextLevel };
        }
        return s;
      })
    );

    // 4. Update Quest Nodes: Mark current as completed, unlock next as active
    setQuestNodes((prev) =>
      prev.map((node) => {
        if (node.id === completedQuestId) {
          return { ...node, status: 'completed' };
        }
        if (node.id === completedQuestId + 1) {
          return { ...node, status: 'active' };
        }
        return node;
      })
    );

    setActiveQuestForReader(null);
  };

  const equippedHatName = SHOP_ITEMS.find((i) => i.id === equippedHatId)?.name;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      {/* Background Graphic Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-screen scale-105"
          style={{ backgroundImage: `url(${CYBER_TOWN_BACKDROP})` }}
        />
        <div className="absolute inset-0 cyber-grid opacity-25" />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Main App Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header with Role Switcher & Economy */}
        <Header
          coins={coins}
          onOpenShop={() => setIsShopOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          equippedHatName={equippedHatName}
          activeRole={activeRole}
          onSelectRole={(r) => setActiveRole(r)}
          isMeetingCompleted={isMeetingCompleted}
        />

        {/* Sub-Bar: Student View Switcher (Town Square vs Quest Map) - Only visible in student mode */}
        {activeRole === 'student' && (
          <div className="w-full bg-slate-950/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentView('town_square');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    currentView === 'town_square'
                      ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🏛️ Ruang Town Square
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentView('quest_map');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    currentView === 'quest_map'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ⚔️ Peta Quest (Menara Biner)
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                <span className="font-mono">
                  Pet: <strong className="text-cyan-300">{pet.name}</strong> ({pet.stage === 'BABY_DIGIMON' ? 'Menetas 🐾' : `${pet.hatchProgress}%`})
                </span>
                <span>·</span>
                <span className="font-mono">
                  PR Status:{' '}
                  <strong className={isHomeworkDone ? 'text-emerald-400' : isMeetingCompleted ? 'text-cyan-400' : 'text-amber-400'}>
                    {isHomeworkDone ? 'Selesai (100) ⭐' : isMeetingCompleted ? 'Terbuka 🔓' : 'Terkunci 🔒'}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area based on Active Role */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between">
          {/* ============================================================== */}
          {/* ROLE 1: SISWA VIEW */}
          {/* ============================================================== */}
          {activeRole === 'student' && (
            currentView === 'town_square' ? (
              <>
                {/* Dedicated Homework Card (PR Hari Ini) */}
                <HomeworkCard
                  isMeetingCompleted={isMeetingCompleted}
                  isHomeworkDone={isHomeworkDone}
                  onOpenQuiz={() => setIsQuizModalOpen(true)}
                  onSwitchToTeacher={() => setActiveRole('teacher')}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Town Square 4-Player Party */}
                  <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
                    <TownSquareParty
                      students={displayedStudents}
                      onSelectStudent={(coder) => setSelectedCoder(coder)}
                      onOpenInvite={() => setIsInviteOpen(true)}
                    />
                  </div>

                  {/* Pet Sanctuary (Egg or Hatched Baby Digimon) */}
                  <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
                    <PetSanctuary
                      pet={pet}
                      onFeedPet={handleFeedPet}
                      onRenamePet={handleRenamePet}
                    />
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <BottomActionBar
                  onOpenQuestMap={() => setCurrentView('quest_map')}
                  activeChapter={questNodes.find((q) => q.status === 'active')?.chapter || 3}
                />
              </>
            ) : (
              <CyberQuestMap
                questNodes={questNodes}
                onBackToTownSquare={() => setCurrentView('town_square')}
                onOpenQuestReader={(quest) => setActiveQuestForReader(quest)}
                equippedHatId={equippedHatId}
              />
            )
          )}

          {/* ============================================================== */}
          {/* ROLE 2: TEACHER DASHBOARD (MODE GURU) */}
          {/* ============================================================== */}
          {activeRole === 'teacher' && (
            <TeacherDashboard
              students={displayedStudents}
              isMeetingCompleted={isMeetingCompleted}
              onCompleteMeeting={handleCompleteMeeting}
              teacherNote={teacherNote}
              onUpdateNote={(note) => setTeacherNote(note)}
              onSwitchToParentView={() => setActiveRole('parent')}
              onSwitchToStudentView={() => setActiveRole('student')}
            />
          )}

          {/* ============================================================== */}
          {/* ROLE 3: PARENT HUB (PORTAL ORANG TUA) */}
          {/* ============================================================== */}
          {activeRole === 'parent' && (
            <ParentHub
              isMeetingCompleted={isMeetingCompleted}
              teacherNote={teacherNote}
              studentName="Budi (Kamu)"
              coins={coins}
              pet={pet}
              onSendParentLove={handleSendParentLove}
              onSwitchToTeacherView={() => setActiveRole('teacher')}
              onSwitchToStudentView={() => setActiveRole('student')}
            />
          )}
        </main>
      </div>

      {/* Wardrobe Shop Modal */}
      <AvatarShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        coins={coins}
        inventory={inventory}
        equippedHatId={equippedHatId}
        onBuyItem={handleBuyItem}
        onEquipItem={handleEquipItem}
      />

      {/* Coder Card Modal */}
      <CoderCardModal
        coder={selectedCoder}
        isOpen={!!selectedCoder}
        onClose={() => setSelectedCoder(null)}
      />

      {/* Invite Classmate Modal (Slot 4) */}
      <InviteFriendModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      {/* Interactive Mimo-Style Quest Reader Modal */}
      <QuestReaderModal
        quest={activeQuestForReader}
        isOpen={!!activeQuestForReader}
        onClose={() => setActiveQuestForReader(null)}
        onClaimReward={handleClaimQuestReward}
        equippedHatId={equippedHatId}
      />

      {/* Homework Quiz Modal (3 Questions) */}
      <HomeworkQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onQuizComplete={handleHomeworkComplete}
      />

      {/* Epic Pet Evolution Climax Modal (Cracking -> Baby Digimon) */}
      <PetEvolutionModal
        isOpen={isEvolutionModalOpen}
        onClose={() => setIsEvolutionModalOpen(false)}
        onAcknowledgeHatch={handleAcknowledgeHatch}
      />
    </div>
  );
}
