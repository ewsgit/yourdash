import React from "react";
import useTranslate from "../../../../../helpers/l10n";
import {IconButton, Chip, Row} from "../../../../../ui";
import {useNavigate} from "react-router-dom";
import WeatherHourlyConditions from "../../widgets/weather/WeatherHourlyConditions/WeatherHourlyConditions";
import styles from "./DashboardLayout.module.scss";
import BlankDashWidget from "../../widgets/blank/BlankDashWidget";

export interface IDashboard {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const DashboardLayout: React.FC<IDashboard> = ({
  username,
  fullName
}) => {
  const navigate = useNavigate();
  const trans = useTranslate("dash");
  return (
    <main
      className={"flex flex-col w-full min-h-full h-full overflow-y-auto"}
    >
      <header className={"p-6 pl-8 pr-8 flex flex-col from-container-bg to-transparent bg-gradient-to-b"}>
        <Row>
          <span className={"text-5xl font-bold"}>
            {
              trans("LOCALIZED_GREETING", [fullName.first, fullName.last])
            }
          </span>
          <IconButton
            className={"ml-auto"}
            icon={"gear-16"}
            onClick={() => {
              navigate("/app/a/settings");
            }}
          />
        </Row>
        <Row className={"pt-6 flex-wrap child:flex-grow md:child:flex-grow-0"}>
          {/* Chips */}
          <Chip onClick={() => 0}>
            {"Weather 20°C"}
          </Chip>
          <Chip onClick={() => 0} active>
            {"Rain at 3pm"}
          </Chip>
          <Chip onClick={() => 0}>
            {"You have 76 unread notifications"}
          </Chip>
        </Row>
      </header>
      <section className={styles.content}>
        {/* Widgets */}
        <WeatherHourlyConditions/>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
        <div className={"bg-red-400 h-auto rounded-xl flex items-center justify-center font-bold text-4xl text-center p-4"}>
          {"Placeholder Widget"}
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
