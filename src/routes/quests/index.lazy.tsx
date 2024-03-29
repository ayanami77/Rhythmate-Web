import { createLazyFileRoute } from "@tanstack/react-router";
import { Menu, Header, ContentLayout } from "../../features/common/components";
import { QuestsPresenter } from "../../features/quests/components/QuestsPresenter";

export const Route = createLazyFileRoute("/quests/")({
  component: () => <Quests />,
});

const Quests = () => {
  return (
    <>
      <Header />
      <ContentLayout>
        <QuestsPresenter />
      </ContentLayout>
      <Menu />
    </>
  );
};
