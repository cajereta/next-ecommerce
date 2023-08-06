import { Player } from "@lottiefiles/react-lottie-player";
import order from "@/public/animation.json";

const OrderAnimation = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-24">
      <h1>Prepping your order!</h1>
      <Player autoplay loop src={order} />
    </div>
  );
};

export default OrderAnimation;
