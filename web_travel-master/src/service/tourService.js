import db from "../models/index";

const { Sequelize, Op } = require("sequelize");
let createNewTour = async (data) => {
  console.log(
    "..............................................................."
  );
  console.log(data);
  console.log(
    "..............................................................."
  );
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem id_agency có tồn tại hay không
      const agency = await db.Travel_agency.findByPk(data.id_agency);
      if (!agency) {
        return reject(new Error("Invalid id_agency"));
      }

      await db.DetailTour.create({
        title: data.title,
        imageUrl: data.imageUrl,
        price: data.price,
        description: data.description,
        id_agency: data.id_agency, // Đảm bảo rằng id_agency được truyền vào
      });
      resolve("ok ! tao new tour thanh cong !");
    } catch (e) {
      reject(e);
    }
  });
};

const deleteTour = async (tourId) => {
  try {
    await db.DetailTour.destroy({
      where: {
        id: tourId,
      },
    });
  } catch (error) {
    throw error;
  }
};
const findAllTours = async () => {
  try {
    const tours = await db.DetailTour.findAll();
    return tours;
  } catch (error) {
    throw error; // Hoặc xử lý lỗi theo cách mong muốn
  }
};

const filterTour = (searchParams) => {
  return new Promise((resolve, reject) => {
    const searchConditions = {};

    // Kiểm tra và thêm điều kiện 'price' nếu không rỗng
    if (searchParams.price) {
      // Trích xuất các giá trị số từ chuỗi
      const pricePattern = /(\d+\.\d+\.\d+)/g;
      const priceRange = searchParams.price.match(pricePattern);
      if (priceRange && priceRange.length === 2) {
        const minPrice = Number(priceRange[0].replace(/\./g, ""));
        const maxPrice = Number(priceRange[1].replace(/\./g, ""));
        // Kiểm tra và thêm điều kiện 'start-destination' nếu không rỗng
        // if (searchParams["start-destination"]) {
        //   searchConditions.startDestination = searchParams["start-destination"];
        // }

        // // Kiểm tra và thêm điều kiện 'end-destination' nếu không rỗng
        // if (searchParams["end-destination"]) {
        //   searchConditions.endDestination = searchParams["end-destination"];
        // }
        searchConditions.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      } else {
        reject(new Error("Giá trị price không hợp lệ:" + searchParams.price));
      }
    }

    db.DetailTour.findAll({
      where: searchConditions,
      raw: true,
    })
      .then((tours) => {
        resolve(tours);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const findTourById = async (tourId) => {
  try {
    const tour = await db.DetailTour.findByPk(tourId);
    return tour;
  } catch (error) {
    throw error;
  }
};

const updateTour = async (tourId, data) => {
  try {
    await db.DetailTour.update(data, {
      where: {
        id: tourId,
      },
    });
  } catch (error) {
    throw error;
  }
};

let filterTourCommon = (searchQuery) => {
  console.log(searchQuery);
  return new Promise((resolve, reject) => {
    const whereClause = {};
    for (const key in searchQuery) {
      if (searchQuery.hasOwnProperty(key)) {
        whereClause[key] = {
          [Op.like]: `%${searchQuery[key]}%`,
        };
      }
    }

    db.DetailTour.findAll({
      where: whereClause,
      raw: true,
    })
      .then((tours) => {
        resolve(tours);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let getAllCustomerFeedback = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let responses = await db.DetailTour.findAll({
        limit: 20, // Giới hạn số lượng phản hồi trả về
      });
      resolve(responses);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewTour: createNewTour,
  findAllTours: findAllTours,
  deleteTour: deleteTour,
  findTourById: findTourById,
  updateTour: updateTour,
  filterTour: filterTour,
  filterTourCommon: filterTourCommon,
  getAllCustomerFeedback: getAllCustomerFeedback,
};
