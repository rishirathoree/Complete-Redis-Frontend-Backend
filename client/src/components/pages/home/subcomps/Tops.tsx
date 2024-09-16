import React, { useEffect } from 'react';
import { LineChart } from '../../../common/LineCharts/Linec';
const Tops: React.FC = () => {
    
    type DataItem = {
        date: string;
        revenue: number;
        collection: number;
      };
      
      const data: DataItem[] = [
        { date: "Jan 23", revenue: 0, collection: 0,products: 0 },
        { date: "Feb 23", revenue: 0, collection: 0,products: 0 },
        { date: "Mar 23", revenue: 0, collection: 0,products: 0 },
        { date: "Apr 23", revenue: 0, collection: 0,products: 0 },
        { date: "May 23", revenue: 0, collection: 0,products: 0 },
        { date: "Jun 23", revenue: 0, collection: 0,products: 0 },
        { date: "Jul 23", revenue: 0, collection: 0,products: 0 },
        { date: "Aug 23", revenue: 0, collection: 0,products: 0 },
        { date: "Sep 23", revenue: 0, collection: 0,products: 0 },
        { date: "Oct 23", revenue: 0, collection: 0,products: 0 },
        { date: "Nov 23", revenue: 0, collection: 0,products: 0 },
        { date: "Dec 23", revenue: 0, collection: 0,products: 0 },
      ];
      
      
        data.forEach((item) => {
            item.revenue = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;
            item.collection = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
            item.products = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
          });
      

    const [datas, setDatas] = React.useState<TooltipProps | null>(null)

    const currencyFormatter = (number: number) => `$${Intl.NumberFormat("us").format(number)}`

    const payload = datas?.payload?.[0]
    const value = payload?.value

    const formattedValue = payload ? currencyFormatter(value) : currencyFormatter(data[data.length - 1].revenue)

    return (
        <div className='grid grid-cols-2'>
            {Array(4).fill(1).map((item, i) => {
                return (
                    <div className='p-8'>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Revenue by month
                        </p>
                        <p className="mt-2 text-4xl font-semibold text-gray-700 dark:text-gray-50">
                            {formattedValue}
                        </p>

                        <LineChart
                            data={data}
                            index="date"
                            colors={['amber','pink','blue']}
                            categories={["revenue",'collection','products']}
                            showLegend={false}
                            showYAxis={true}
                            startEndOnly={false}
                            className="h-60 mt-4"
                            tooltipCallback={(props) => {
                                if (props.active) {
                                    setDatas((prev) => {
                                        if (prev?.label === props.label) return prev
                                        return props
                                    })
                                } else {
                                    setDatas(null)
                                }
                                return null
                            }}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default Tops;