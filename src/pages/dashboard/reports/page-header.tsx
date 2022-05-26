import { ReportsFilters } from './reports-filters';

function PageHeader() {
  return (
    <div className="mvp-pages-reports__header">
      <div className="mvp-pages-reports__title__container">
        <h1 className="mvp-pages-reports__title">Reports</h1>
        <span className="mvp-pages-reports__description">
          Easily generate a report of your transactions
        </span>
      </div>

      <ReportsFilters />
    </div>
  );
}

export { PageHeader };
