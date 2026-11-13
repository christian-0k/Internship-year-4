import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', fr: 'Accueil' },
  'nav.courses': { en: 'Courses', fr: 'Formations' },
  'nav.labs': { en: 'Sandbox Labs', fr: 'Laboratoires Virtuels' },
  'nav.verify': { en: 'Verify Certificate', fr: 'Vérifier Certificat' },
  'nav.business': { en: 'For Enterprise', fr: 'Pour Entreprises' },
  'nav.login': { en: 'Log in', fr: 'Connexion' },
  'nav.signup': { en: 'Get Started', fr: 'Commencer' },
  'nav.logout': { en: 'Sign Out', fr: 'Déconnexion' },
  'nav.switchRole': { en: 'Switch Portal', fr: 'Changer de Portail' },
  'nav.telemetry': { en: 'LIVE TELEMETRY ACTIVE', fr: 'TÉLÉMÉTRIE EN DIRECT ACTIVE' },

  // Role labels
  'role.student': { en: 'Learner / Student', fr: 'Apprenant / Étudiant' },
  'role.instructor': { en: 'Instructor / SME', fr: 'Instructeur / Expert' },
  'role.lab_tech': { en: 'Lab Technician', fr: 'Technicien de Laboratoire' },
  'role.org_manager': { en: 'Org Manager (B2B)', fr: 'Gestionnaire d’Organisation' },
  'role.guardian': { en: 'Guardian / Sponsor', fr: 'Tuteur / Promoteur' },
  'role.admin': { en: 'Platform Admin', fr: 'Administrateur Plateforme' },

  // Hero section
  'hero.badge': { en: 'Next-Gen IT & Network Engineering Academy', fr: 'Académie d’Ingénierie Réseau & Maintenance IT' },
  'hero.title1': { en: 'Master Physical Hardware &', fr: 'Maîtrisez le Matériel Réel &' },
  'hero.title2': { en: 'Enterprise Networks in Sandbox', fr: 'Réseaux d’Entreprise en Sandbox' },
  'hero.subtitle': {
    en: 'Zero-setup browser virtual machines, live Cisco IOS-XE command-line sandboxes, and hardware multimeter telemetry powered by Socratic AI.',
    fr: 'Machines virtuelles sans configuration, consoles Cisco IOS-XE en direct dans le navigateur, et télémétrie matérielle guidée par IA socratique.'
  },
  'hero.ctaMaintenance': { en: 'Explore IT Maintenance Track', fr: 'Parcours Maintenance IT' },
  'hero.ctaNetworking': { en: 'Explore Networking Track', fr: 'Parcours Réseaux & Cisco' },
  'hero.trySandbox': { en: 'Launch Live Sandbox Demo', fr: 'Lancer la Démo Interactive' },

  // Track Selector
  'track.selectorTitle': { en: 'Choose Your Career Specialization', fr: 'Choisissez Votre Spécialisation' },
  'track.itTitle': { en: 'IT Systems & Hardware Maintenance', fr: 'Maintenance Systèmes & Matériel IT' },
  'track.itDesc': {
    en: 'Component-level motherboard diagnostics, power supply testing, Linux/Windows recovery, BIOS flashing, and CompTIA A+ certification prep.',
    fr: 'Diagnostic de composants carte mère, test d’alimentations, restauration Linux/Windows, flash BIOS et préparation certification CompTIA A+.'
  },
  'track.netTitle': { en: 'Enterprise Networking & Routing', fr: 'Réseaux d’Entreprise & Routage' },
  'track.netDesc': {
    en: 'Cisco CCNA/CCNP topologies, VLAN segmentation, OSPF multi-area routing, BGP peering, and zero-trust firewall configurations.',
    fr: 'Topologies Cisco CCNA/CCNP, segmentation VLAN, routage OSPF multi-zones, peering BGP et configuration de pare-feu zero-trust.'
  },

  // Auth & RBAC
  'auth.selectRoleTitle': { en: 'Select Your Primary Portal Role', fr: 'Sélectionnez Votre Rôle Portail' },
  'auth.selectRoleDesc': {
    en: 'Your account and privileges will be registered in the database to grant access to your designated workspace.',
    fr: 'Votre compte et vos privilèges seront enregistrés dans la base de données pour vous attribuer votre espace dédié.'
  },
  'auth.continueGoogle': { en: 'Continue with Google', fr: 'Continuer avec Google' },
  'auth.continueGithub': { en: 'Continue with GitHub', fr: 'Continuer avec GitHub' },
  'auth.orEmail': { en: 'Or continue with email', fr: 'Ou continuer par e-mail' },
  'auth.rbacNotice': {
    en: 'Access Restricted: You have been redirected to your assigned role dashboard.',
    fr: 'Accès Restreint : Vous avez été redirigé vers le tableau de bord de votre rôle assigné.'
  },
  'auth.testPersonas': { en: '1-Click Test Personas (Preview Mode)', fr: 'Profils de Test en 1 Clic (Mode Démo)' },

  // Portal Titles
  'portal.studentTitle': { en: 'Learner Command Center', fr: 'Centre de Commande Apprenant' },
  'portal.instructorTitle': { en: 'Instructor & Curriculum Studio', fr: 'Studio Instructeur & Auteur' },
  'portal.labTechTitle': { en: 'Physical Lab Operations & Bench Map', fr: 'Opérations Lab & Cartographie Bacs' },
  'portal.orgTitle': { en: 'Enterprise Workforce Intelligence', fr: 'Supervision des Équipes Entreprise' },
  'portal.guardianTitle': { en: 'Sponsored Student Dossier & Grades', fr: 'Dossier Apprenti & Relevé de Notes' },
  'portal.adminTitle': { en: 'Platform Root Administration & APM', fr: 'Administration Root & Supervision APM' },

  // Common UI
  'common.search': { en: 'Search resources, commands, or students...', fr: 'Rechercher ressources, commandes, ou étudiants...' },
  'common.filter': { en: 'Filter', fr: 'Filtrer' },
  'common.all': { en: 'All', fr: 'Tous' },
  'common.status': { en: 'Status', fr: 'Statut' },
  'common.online': { en: 'Online', fr: 'En ligne' },
  'common.active': { en: 'Active', fr: 'Actif' },
  'common.loading': { en: 'Synchronizing...', fr: 'Synchronisation...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('netmentor_lang');
    return (saved === 'fr' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('netmentor_lang', lang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
