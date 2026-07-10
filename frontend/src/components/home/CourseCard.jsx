import { Plus } from "lucide-react";

const CourseCard = ({
  title,
  description,
  lessons,
  projects,
  price,
  image,
  variant = "vertical",
  icon: IconTag,
}) => {
  if (variant === "horizontal") {
    return (
      <div className="flex flex-col md:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100 col-span-1 md:col-span-2 hover:shadow-md transition-shadow duration-300">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative h-48 md:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-[#0A1629]/60 backdrop-blur-md px-2 md:px-3 py-1 rounded text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wide">
            Honors Level
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-[#1A2B47] mb-2 md:mb-3 line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
              {description}
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              <span className="bg-gray-100 text-[9px] md:text-[10px] font-bold text-gray-500 px-2 md:px-3 py-1 rounded uppercase whitespace-nowrap">
                {lessons} Lessons
              </span>
              <span className="bg-gray-100 text-[9px] md:text-[10px] font-bold text-gray-500 px-2 md:px-3 py-1 rounded uppercase whitespace-nowrap">
                {projects} Projects
              </span>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-6 md:mt-8">
            {/* Students */}
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 md:w-8 h-6 md:h-8 rounded-full border-2 border-white bg-gray-200 flex-shrink-0"
                />
              ))}
              <span className="pl-2 md:pl-4 text-[8px] md:text-[10px] text-gray-400 font-bold self-center whitespace-nowrap">
                +2.4k students
              </span>
            </div>
            {/* Price */}
            <span className="text-lg md:text-xl font-bold text-[#1A2B47] w-full sm:w-auto text-right">
              ${price}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Variant
  return (
    <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
      <div>
        {/* Icon */}
        <div className="w-9 md:w-10 h-9 md:h-10 bg-[#FFF4ED] rounded-lg flex items-center justify-center text-[#F08A4B] font-bold mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
          {IconTag}
        </div>

        {/* Title */}
        <h3 className="text-base md:text-xl font-bold text-[#1A2B47] mb-2 md:mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8 md:mt-12 gap-3">
        <span className="text-base md:text-lg font-bold text-[#1A2B47] flex-shrink-0">
          ${price}
        </span>
        <button className="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 active:scale-95 transition-all duration-200 flex-shrink-0">
          <Plus className="w-4 md:w-5 h-4 md:h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
