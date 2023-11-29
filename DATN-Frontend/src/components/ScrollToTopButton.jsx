import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [container, setContainer] = useState(document.getElementById("container"));
  useEffect(() => {
    setContainer(document.getElementById("container"));
  }, []);

  useEffect(() => {
    if (container != null) {
      const checkScrollTop = () => {
        if (container.scrollTop > 0) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };

      container.addEventListener("scroll", checkScrollTop);

      // Xác định trạng thái khi một trang được tải lại
      // checkScrollTop();

      return () => {
        container.removeEventListener("scroll", checkScrollTop);
      };
    }
  }, [container])

  // Xử lý sự kiện click để cuộn lên đầu trang
  const handleScrollToTop = () => {
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <div style={{ position: "absolute", bottom: "20px", right: "20px", zIndex: 10000000 }}>
          <CustomButton
            IconButton={MdOutlineKeyboardArrowUp}
            func={handleScrollToTop}
            color="white"
            size={35}
            style={{
              width: 35,
              height: 35,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 8,
              filter: "blur(0.5px)",
              border: "1px solid #dee2e6",
              textAlign: "center",
            }}
            id="scroll"
          />
        </div>

      )}
    </>
  );
};

export default ScrollToTopButton;
