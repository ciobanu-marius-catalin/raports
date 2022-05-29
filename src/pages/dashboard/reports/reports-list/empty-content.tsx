import { Exception } from 'sass';

const EmptyContent = () => {
  return (
    <div className="mvp-pages-reports__content--empty">
      <div className="mvp-pages-reports__content--empty__inner">
        <h2 className="mvp-pages-reports__title">No reports</h2>
        <span className="mvp-pages-reports__description">
          Currently you have no data for the reports to be generated. Once you
          start generating traffic through the Balance application the reports
          will be shown.
        </span>
        <img src="/no-reports.png" alt="no-raports" />
      </div>
    </div>
  );
};

export { EmptyContent };
