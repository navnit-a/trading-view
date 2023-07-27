import { createChart, ColorType, TickMarkType } from "lightweight-charts";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const chartContainerRef = useRef();
  const tooltipRef = useRef();

  const [linePrice, setLinePrice] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  // this and that

  useEffect(() => {
    const initialData = [
      { time: "2018-11-22", value: 32.51 },
      { time: "2018-11-23", value: 31.11 },
      { time: "2018-11-24", value: 27.02 },
      { time: "2018-11-25", value: 27.32 },
      { time: "2018-11-26", value: 25.17 },
      { time: "2018-11-27", value: 28.89 },
      { time: "2018-11-28", value: 25.46 },
      { time: "2018-11-29", value: 23.92 },
      { time: "2018-11-30", value: 22.68 },
      { time: "2018-11-31", value: 22.67 },
    ];

    // // Find the min and max values in the initial data
    // const values = initialData.map((data) => data.value);
    // const min = Math.min(...values);
    // const max = Math.max(...values);
    //
    // // Find the last date in the initial data
    // let lastDate = new Date(initialData[initialData.length - 1].time);
    //
    // // Generate 100 new data points
    // for (let i = 0; i < 90; i++) {
    //   // Increment the date by one day
    //   lastDate.setDate(lastDate.getDate() + 1);
    //
    //   // Generate a random value between min and max
    //   const value = Math.random() * (max - min) + min;
    //
    //   // Add the new data point to the initial data
    //   initialData.push({ time: lastDate.toISOString().split("T")[0], value });
    // }

    const markers = [
      {
        time: "2018-12-24",
        position: "aboveBar",
        color: "#f68410",
        shape: "arrowDown",
        text: "Buy",
        size: 2,
      },
      {
        time: "2018-12-31",
        position: "belowBar",
        color: "#f68410",
        shape: "arrowUp",
        text: "Sell",
        size: 2,
      },
    ];

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#222" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartContainerRef.current.clientWidth,

      height: window.innerHeight,
      // autoSize: false, // do not add this line, it will break the chart *** IMPORTANT *** // KABOOM
      crosshair: {
        mode: 1,
        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#E71D6B",
          backgroundColor: "#E71D6B",
        },
        vertLine: {
          width: 1,
          color: "#9B7DFF",
          labelBackgroundColor: "#E71D6B",
        },
      },
      localization: {
        locale: "en-US",
        dateFormat: "MM-dd-yyyy",
        // timeFormatter: (time) => {
        //   const date = new Date(time * 1000);
        //   return date.toLocaleTimeString("en-US");
        //   // const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
        //   //   hour: "numeric",
        //   //   minute: "numeric",
        //   //   month: "short",
        //   //   day: "numeric",
        //   //   year: "2-digit",
        //   // });
        //   // return dateFormatter.format(date);
        // },
      },
    });

    chart.priceScale("right").applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
      borderColor: "#9B7DFF",
      borderVisible: true,
      mode: 3,
      alignLabels: true,
      // autoScale: false,
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: "#009BFD",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    chart.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: true,
      borderColor: "#9B7DFF",
      rightOffset: 0,
      // autoScale: false,
      // fixRightEdge: true,

      // convert time to local time zone ** IMPORTANT **

      // tickMarkFormatter: (time, tickMarkType, locale) => {
      //   const date = new Date(time * 1000);

      //   console.log("date", date);

      //   return date.toLocaleDateString("en-US");

      // switch (tickMarkType) {
      //   case TickMarkType.Year: {
      //     return date.getFullYear();
      //   }

      //   case TickMarkType.Month: {
      //     const monthFormatter = new Intl.DateTimeFormat(locale, {
      //       month: "short",
      //     });

      //     return monthFormatter.format(date);
      //   }

      //   case TickMarkType.DayOfMonth: {
      //     return date.getDate();
      //   }

      //   case TickMarkType.Time: {
      //     {
      //       const timeFormatter = new Intl.DateTimeFormat(locale, {
      //         hour: "numeric",
      //         minute: "numeric",
      //       });
      //       return timeFormatter.format(date);
      //     }
      //   }
      // }
      // },
    });

    areaSeries.setData(initialData);
    areaSeries.setMarkers(markers);

    // areaSeries.update({ time: "2018-12-31", value: 1 });
    // areaSeries.update({ time: "2019-01-01", value: 10 });
    // areaSeries.update({ time: "2019-01-02", value: 20 });

    setInterval(() => {
      // Get the last item in the array
      // Get the last item in the array
      let lastItem = initialData[initialData.length - 1];

      // Extract date components
      let { year, month, day } = lastItem.time;

      // Create a new date object from the last item's time and increment the day by 1
      let newDate = new Date(year, month - 1, day);
      newDate.setDate(newDate.getDate() + 1);

      // Create a new object for time
      let newTime = {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      };

      // Generate a random value between 20 and 35
      let randomValue = Math.random() * (35 - 20) + 20;

      // Add the new object to the array
      initialData.push({ time: newTime, value: randomValue });

      console.log("newTime", newTime);

      areaSeries.setData(initialData);
    }, 1000);

    // initialData.push(newPlot);
    //   console.log("newPlot", newPlot);
    //   areaSeries.update(newPlot);
    // }, 1000);

    const handleResize = () => {
      if (chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: window.innerHeight,
        });
        chart.timeScale().fitContent();
      }
    };

    chart.subscribeCrosshairMove((param) => {
      // console.log("param", param);
      if (param.time) {
        const data = param.seriesData.get(areaSeries);

        const coordinates = areaSeries.priceToCoordinate(data.value);
        const shiftedCoordinates = param.point.x - 300;

        tooltipRef.current.style.left = `${shiftedCoordinates}px`;
        tooltipRef.current.style.top = `${coordinates}px`;

        // console.log("coordinates", coordinates);

        setLinePrice(data);
        setCurrentTime(new Date(param.time).toLocaleTimeString("en-US"));
        // console.log("price", data);
      }
    });

    window.addEventListener("resize", handleResize);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={chartContainerRef} style={{ position: "relative" }}>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          width: 250,
          height: 120,
          border: "1px solid white",
          color: "white",
          zIndex: 1000,
          backgroundColor: "#222",
        }}
      >
        <div style={{ margin: 10 }}>Flux</div>
        <div style={{ margin: 10 }}>Price: {linePrice?.value}</div>
        <div style={{ margin: 10 }}>Time: {currentTime}</div>
      </div>
    </div>
  );
}

export default App;
