import toast from "react-hot-toast";

export const logOutFunction = async () => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};

export const price_statics = [
  {
    start1: "01 Aug 2025",
    end1: "31 Aug 2025",
    burning_event: "6.4",
    dollar: 1,
    token_cnt: 100,
  },
  {
    start1: "01 Sept 2025",
    end1: "30 Sept 2025",
    burning_event: "8",
    dollar: 1,
    token_cnt: 50,
  },
  {
    start1: "01 Oct 2025",
    end1: "31 Oct 2025",
    burning_event: "10",
    dollar: 1,
    token_cnt: 25,
  },
  {
    start1: "01 Nov 2025",
    end1: "30 Nov 2025",
    burning_event: "12.5",
    dollar: 1,
    token_cnt: 12,
  },
  {
    start1: "01 Dec 2025",
    end1: "31 Dec 2025",
    burning_event: "15.625",
    dollar: 1,
    token_cnt: 6,
  },
  {
    start1: "01 Jan 2026",
    end1: "31 Jan 2026",
    burning_event: "19.53125",
    dollar: 1,
    token_cnt: 3,
  },
  {
    start1: "01 Feb 2026",
    end1: "28 Feb 2026",
    burning_event: "24.4140625",
    dollar: 1,
    token_cnt: 1.5,
  },
  {
    start1: "01 Mar 2026",
    end1: "31 Mar 2026",
    burning_event: "30.51757813",
    dollar: 1,
    token_cnt: 0.75,
  },
  {
    start1: "01 Apr 2026",
    end1: "30 Apr 2026",
    burning_event: "38.14697266",
    dollar: 1,
    token_cnt: 0.37,
  },
  {
    start1: "01 May 2026",
    end1: "31 May 2026",
    burning_event: "47.68371582",
    dollar: 1,
    token_cnt: 0.18,
  },
];
