import {
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
  } from "framer-motion";
  import { Cat, Dog, Home, Package, Package2 } from "lucide-react";
  import { useRef } from "react";
  import { Link } from "react-router-dom";
import { Tooltip } from "../Tooltips/Tooltips";
  
  function Dock() {
    let mouseX = useMotionValue(Infinity);
    
    const iconsRoute = [
      {title:"Home", icon: Home, path: "/" },
      {title:"Pets Management", icon: Dog, path: "/pets" },
      {title:"Breeds Management", icon: Cat, path: "/breeds" },
      {title:"Orders", icon: Package, path: "/pets" },
      {title:"Categories", icon: Package2, path: "/pets" },
    ];
  
    return (
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed left-1/2 bottom-4 transform -translate-x-1/2 flex h-16 items-end gap-4 rounded-2xl px-4 pb-3"
      >
        {iconsRoute.map((item, idx) => (
          <AppIcon mouseX={mouseX} key={idx} path={item.path}>
            <Tooltip content={item.title}>
            <item.icon strokeWith={0.5} />
            </Tooltip>
          </AppIcon>
        ))}
      </motion.div>
    );
  }
  
  function AppIcon({
    mouseX,
    children,
    path,
  }: {
    mouseX: MotionValue;
    children: React.ReactNode;
    path: string;
  }) {
    let ref = useRef<HTMLDivElement>(null);
  
    let distance = useTransform(mouseX, (val) => {
      let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
    });
  
    let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  
    return (
      <Link to={path} className="flex items-center justify-center">
        <motion.div
          ref={ref}
          style={{ width }}
          className="aspect-square w-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          {children}
        </motion.div>
      </Link>
    );
  }
  
  export default Dock;
  