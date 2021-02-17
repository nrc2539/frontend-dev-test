import React, { useState, useEffect, forwardRef } from "react";
import "../css/content.css";
import { Breadcrumbs, Grid, Link, Button } from "@material-ui/core";
import { Home, DateRange, SaveAlt, Print, BarChart } from "@material-ui/icons";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ViewColumn from "@material-ui/icons/ViewColumn";
import exampleData from "../example_data/data.json";

const tableIcons = {
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function ContentComponent() {
  const [selectedType, setSelectedType] = useState("year");
  const [selectedYear, setSelectedYear] = useState(
    new Date(new Date().setDate(new Date().getDate() - 365))
  );
  const [tableData, setTableData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totaltransaction: 0,
    totalpoint: 0,
    remainingpoint: 0,
    lifetimevalue: 0,
  });
  const [summaryTier, setSummaryTier] = useState([]);
  useEffect(() => {
    setSummaryTier(exampleData.data.summarytier);
    if (exampleData.data.list.length > 0) {
      setTableData(exampleData.data.list);
    }
    setSummaryData(exampleData.data.summary);
  }, []);
  const changeType = (e) => {
    setSelectedType(e.target.value);
  };

  const tableColumn = [
    {
      field: "customername",
      title: "Name",
      align: "center",
      cellStyle: { padding: "8px", borderRight: "1px solid #E6E6E6" },
    },
    {
      field: "customerphone",
      title: "ID",
      align: "center",
      cellStyle: { padding: "8px", borderRight: "1px solid #E6E6E6" },
    },
    {
      field: "customertier",
      title: "Tier",
      align: "center",
      cellStyle: { padding: "8px", borderRight: "1px solid #E6E6E6" },
    },
    {
      field: "totalamount",
      title: "LTV",
      type: "numeric",
      cellStyle: {
        padding: "8px",
        textAlign: "right",
        borderRight: "1px solid #E6E6E6",
      },
    },
    {
      field: "totaltransaction",
      title: "Total Trans.",
      cellStyle: {
        padding: "8px",
        textAlign: "right",
        borderRight: "1px solid #E6E6E6",
      },
    },
    {
      field: "totalreward",
      title: "Total Point",
      cellStyle: {
        padding: "8px",
        textAlign: "right",
        borderRight: "1px solid #E6E6E6",
      },
    },
    {
      field: "remainingpoint",
      title: "Remaining Point",
      cellStyle: {
        padding: "8px",
        textAlign: "right",
        borderRight: "1px solid #E6E6E6",
      },
    },
  ];

  return (
    <div className="content">
      {/* Breadcrumbs Sections */}
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ marginBottom: 10 }}
      >
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="#" color="inherit" className="link-breadcrumb">
              <Home fontSize="small" />
            </Link>
            <Link href="#" color="inherit" className="link-breadcrumb">
              Business Insight
            </Link>
            <Link href="#" color="inherit" className="link-breadcrumb">
              Report
            </Link>
            <Link href="#" color="inherit" className="link-breadcrumb">
              Member
            </Link>
            <span className="link-breadcrumb-active">Member</span>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div className="list-actions">
            <Button className="item-action">
              <BarChart fontSize="small" />
            </Button>
            <Button className="item-action" disabled>
              <SaveAlt fontSize="small" />
            </Button>
            <Button className="item-action" disabled>
              <Print fontSize="small" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {/* Period Section */}
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <p className="text-period-section">{`${
            selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
          }ly Member 01-Jan-${selectedYear.getFullYear()} to 31-Dec-${selectedYear.getFullYear()}`}</p>
        </Grid>
        <Grid item>
          <div className="period-selection">
            <select
              value={selectedType}
              onChange={changeType}
              className="custom-select"
            >
              <option value="year">Year View</option>
            </select>
            <DatePicker
              dateFormat="yyyy"
              selected={selectedYear}
              onChange={(year) => setSelectedYear(year)}
              maxDate={new Date(new Date().setDate(new Date().getDate() - 365))}
              showYearPicker
              yearItemNumber={6}
              className="custom-datepicker"
              id="year_picker"
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport",
                },
              }}
            ></DatePicker>
            <label className="label-datepicker" htmlFor="year_picker">
              <DateRange fontSize="small" />
            </label>
          </div>
        </Grid>
      </Grid>
      {/* Show Total */}
      <Grid
        container
        direction="row"
        className="show-total"
        alignItems="center"
      >
        <Grid item xs={12} md={4} className="total-left-section">
          <div className="total-text">
            <p>Total Members :</p>
            <p>{summaryTier.length > 0 ? summaryTier[0].total_members : 0}</p>
          </div>
          <div className="total-text">
            <p>Total Rev.(THB) :</p>
            <p>
              {summaryTier.length > 0
                ? summaryTier[0].total_amount > 100000
                  ? (summaryTier[0].total_amount / 1000).toFixed(1) + "K"
                  : summaryTier[0].total_amount.toLocaleString("th-TH")
                : 0}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={8} className="total-right-section">
          {summaryTier.length > 0 ? (
            <>
              <p className="tier-name">{summaryTier[0].tier_name}</p>
              <div
                className="total-text"
                style={{ fontSize: "medium", lineHeight: 0.65 }}
              >
                <p>Total Members :</p>
                <p>
                  {summaryTier.length > 0 ? summaryTier[0].total_members : 0}
                </p>
              </div>
              <div
                className="total-text"
                style={{ fontSize: "medium", lineHeight: 0.65 }}
              >
                <p>Total Rev.(THB) :</p>
                <p>
                  {summaryTier.length > 0
                    ? summaryTier[0].total_amount > 100000
                      ? (summaryTier[0].total_amount / 1000).toFixed(1) + "K"
                      : summaryTier[0].total_amount.toLocaleString("th-TH")
                    : 0}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="total-text">
                <p>Total Members :</p>
                <p>
                  {summaryTier.length > 0 ? summaryTier[0].total_members : 0}
                </p>
              </div>
              <div className="total-text">
                <p>Total Rev.(THB) :</p>
                <p>
                  {summaryTier.length > 0
                    ? summaryTier[0].total_amount > 100000
                      ? (summaryTier[0].total_amount / 1000).toFixed(1) + "K"
                      : summaryTier[0].total_amount.toLocaleString("th-TH")
                    : 0}
                </p>
              </div>
            </>
          )}
        </Grid>
      </Grid>

      {/* Table */}
      <div className="table-section">
        <MaterialTable
          columns={tableColumn}
          data={tableData}
          options={{
            toolbar: false,
            search: false,
            headerStyle: {
              backgroundColor: "#808080",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              borderRight: "1px solid #E6E6E6",
              width: "100%",
              padding: "8px",
            },
            pageSize: 5,
            pageSizeOptions: [],
            rowStyle: (row) => {
              if (row.tableData.id % 2 === 0)
                return { backgroundColor: "#E6E6E6" };
              return { backgroundColor: "#ffffff" };
            },
          }}
          icons={tableIcons}
        />
      </div>

      {/* Footer summary */}
      <div className="footer-summary">
        <p style={{ width: "42.84%" }}>Total</p>
        <p style={{ width: "14.28%" }}>
          {summaryData.lifetimevalue.toLocaleString("th-TH")}
        </p>
        <p style={{ width: "14.28%" }}>
          {summaryData.totaltransaction.toLocaleString("th-TH")}
        </p>
        <p style={{ width: "14.28%" }}>
          {summaryData.totalpoint.toLocaleString("th-TH")}
        </p>
        <p style={{ width: "14.28%" }}>
          {summaryData.remainingpoint.toLocaleString("th-TH")}
        </p>
      </div>
    </div>
  );
}

export default ContentComponent;
