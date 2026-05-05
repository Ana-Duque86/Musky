import type { ReactNode } from "react";
import { ActionList, type ActionListItem } from "../../components/ActionList";
import { Banner, type BannerVariant } from "../../components/Banner";
import { Button } from "../../components/Button";
import { CardCarousel, type CardCarouselProps } from "../../components/CardCarousel";
import { ContentModule, type ContentModuleProps } from "../../components/ContentModule";
import {
  DoubleRewardCard,
  type DoubleRewardCardProps,
  type DoubleRewardCardReward
} from "../../components/DoubleRewardCard";
import { Header, type HeaderProps } from "../../components/Header";
import "./Home.css";

export interface HomeBanner {
  children: ReactNode;
  title?: string;
  variant?: BannerVariant;
  /** Leading del Banner: emoji, texto corto o nodo (pasa a `Banner` como `icon`). */
  icon?: ReactNode;
}

export interface HomeProps {
  actions?: ActionListItem[];
  banner?: HomeBanner;
  header: HeaderProps;
  /** Carrusel horizontal (p. ej. promos) antes de la card de recompensas. */
  promoCarousel?: CardCarouselProps;
  rewardsCard?: DoubleRewardCardProps;
  reimbursements?: ActionListItem[];
  /** Módulo editorial (noticias / tips) al final; mismos márgenes horizontales que el resto de la home. */
  contentModule?: ContentModuleProps;
}

const defaultActions: ActionListItem[] = [
  {
    id: "microchip",
    description: "Necesario para activar reembolsos",
    icon: "microchip",
    priority: "urgent",
    title: "Añade el microchip",
    type: "actionable"
  },
  {
    id: "contract",
    description: "del seguro de tu segunda mascota.\nCaduca el 9 de febrero",
    icon: "medicalDocument",
    priority: "high",
    title: "Termina la contratación",
    type: "actionable"
  },
  {
    id: "vaccine",
    description: "Programa la cita de Perrín con antelación",
    icon: "injection",
    priority: "normal",
    title: "Vacunar a Perrín (6 meses)",
    type: "actionable"
  }
];

const defaultBanner: HomeBanner = {
  children: "Tienes 1 acción urgente y 1 pendiente",
  icon: "🚧",
  title: "Acciones Requeridas",
  variant: "warning"
};

const defaultReimbursements: ActionListItem[] = [
  {
    id: "stomach-pain",
    description: "Falta añadir microchip",
    icon: "care",
    metadata: "18 de enero",
    priority: "blocked",
    progressStatus: "blocked",
    title: "Reembolso bloqueado",
    type: "actionable"
  }
];

const defaultRewardBreakdown: DoubleRewardCardReward[] = [
  {
    activationLabel: "Se activan el 9 de febrero",
    amount: 25,
    id: "reward-february"
  }
];

const defaultRewardsCard: DoubleRewardCardProps = {
  referralCode: "ORI02321",
  rewards: defaultRewardBreakdown,
  rewardsTotal: 25
};

export function Home({
  actions = defaultActions,
  banner = defaultBanner,
  contentModule,
  header,
  promoCarousel,
  rewardsCard = defaultRewardsCard,
  reimbursements = defaultReimbursements
}: HomeProps) {
  return (
    <main className="musky-home">
      <Header {...header} />
      <section className="musky-home__content" aria-label="Acciones pendientes">
        <div className="musky-home__section">
          <Banner {...banner} />
          <ActionList defaultIconTone="brandPink" items={actions} />
        </div>
        <div className="musky-home__section">
          <div className="musky-home__section-header">
            <h1 className="musky-home__section-title">
              <span className="musky-home__section-title-prefix">Tus </span>
              reembolsos
            </h1>
            <Button className="musky-home__section-action" size="sm" variant="secondary">
              Ver todos
            </Button>
          </div>
          <ActionList defaultIconTone="brandPink" items={reimbursements} />
        </div>
        {promoCarousel && promoCarousel.items.length > 0 ? (
          <div className="musky-home__section">
            <CardCarousel {...promoCarousel} />
          </div>
        ) : null}
        <div className="musky-home__section">
          <DoubleRewardCard {...rewardsCard} />
        </div>
        {contentModule ? (
          <div className="musky-home__section">
            <ContentModule {...contentModule} />
          </div>
        ) : null}
      </section>
    </main>
  );
}
