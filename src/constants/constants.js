export const adminSidebarItems = ['Dashboard', 'Product', 'Category', 'Orders', 'Admins', 'Setting']

export const adminAccountPath = "/account/admin/";
export const userAccountPath = "/account/user/";
export const AUTH_TOKEN = localStorage.getItem("auth-token");

export const POST_METHOD = (bodyField) => {
    return {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "auth-token": AUTH_TOKEN
        },
        body: JSON.stringify(bodyField)
    }
}

export const GET_METHOD = () => {
    return {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "auth-token": AUTH_TOKEN
        },
    }
}

export const DELETE_WITHOUT_BODY = () => {
    return {
        method: 'DELETE',
        headers: {
            "auth-token": AUTH_TOKEN
        },
    }
}

export const PRODUCTS = [
    {
        _id: "64d22bc5511e2c508e5a2b72",
        title: "iPhone 14",
        description: "",
        img: [
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671474798353",
            "https://www.apple.com/v/iphone-14/i/images/key-features/features/size/dd_size_v__faidcvs4aamy_large_2x.jpg",
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch_AV2_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671474799310"
        ],
        price: 79990,
        stock: 100,
        brand: "iPhone",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.6,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.947Z",
        updatedAt: "2023-08-08T11:49:25.947Z"
    },
    {
        _id: "64d22bc5511e2c508e5a2b73",
        title: "iPhone 14pro",
        description: "",
        img: [
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539",
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946"
        ],
        price: 129000,
        stock: 100,
        brand: "iPhone",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.7,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.948Z",
        updatedAt: "2023-08-08T11:49:25.948Z"
    },
    {
        _id: "64d22bc5511e2c508e5a2b74",
        title: "Samsung Galaxy S22 Ultra 5G",
        description: "",
        img: [
            "https://m.media-amazon.com/images/I/71J8tz0UeJL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71esKKaTf8L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/51TUyA8hXWL._SL1500_.jpg"
        ],
        price: 131999,
        stock: 100,
        brand: "Samsung",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.1,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.948Z",
        updatedAt: "2023-08-08T11:49:25.948Z"
    },
    {
        _id: "64d22bc5511e2c508e5a2b72",
        title: "iPhone 14",
        description: "",
        img: [
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671474798353",
            "https://www.apple.com/v/iphone-14/i/images/key-features/features/size/dd_size_v__faidcvs4aamy_large_2x.jpg",
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch_AV2_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671474799310"
        ],
        price: 79990,
        stock: 100,
        brand: "iPhone",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.6,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.947Z",
        updatedAt: "2023-08-08T11:49:25.947Z"
    },
    {
        _id: "64d22bc5511e2c508e5a2b73",
        title: "Noise ColorFit Ultra 3 Smart",
        description: "",
        img: [
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539",
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946"
        ],
        price: 129000,
        stock: 100,
        brand: "iPhone",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.7,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.948Z",
        updatedAt: "2023-08-08T11:49:25.948Z"
    },
    {
        _id: "64d22bc5511e2c508e5a2b74",
        title: "Samsung Galaxy S22 Ultra 5G",
        description: "",
        img: [
            "https://m.media-amazon.com/images/I/71J8tz0UeJL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71esKKaTf8L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/51TUyA8hXWL._SL1500_.jpg"
        ],
        price: 131999,
        stock: 100,
        brand: "Samsung",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.1,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.948Z",
        updatedAt: "2023-08-08T11:49:25.948Z"
    },

]

export const SPONSOR_PRODUCT = [
    {
        _id: "64d22bc5511e2c508e5a2b72",
        title: "iPhone 14",
        description: "",
        img: [
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671474798353",
            "https://www.apple.com/v/iphone-14/i/images/key-features/features/size/dd_size_v__faidcvs4aamy_large_2x.jpg",
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch_AV2_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671474799310"
        ],
        price: 79990,
        stock: 100,
        brand: "iPhone",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.6,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.947Z",
        updatedAt: "2023-08-08T11:49:25.947Z"
    },
    {
        _id: "64d22bc5511e2c508e5a2b73",
        title: "iPhone 14pro",
        description: "",
        img: [
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539",
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946"
        ],
        price: 129000,
        stock: 100,
        brand: "iPhone",
        category: ["mobile", "phone", "technology"],
        status: "in stock",
        rating: 4.7,
        seller: "64ceb12b551186f68fa6b136",
        createdAt: "2023-08-08T11:49:25.948Z",
        updatedAt: "2023-08-08T11:49:25.948Z"
    }
]

export const DESCRIPTION = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolorem sint dolore reiciendis asperiores qui illum. Accusamus dolor deserunt perspiciatis nihil atque ratione magnam voluptatem reprehenderit optio et repudiandae aspernatur iusto asperiores illum, molestias ea quis ipsam quo. Cum ipsa sit repellat repudiandae fuga? Ipsum eveniet cupiditate praesentium laborum soluta enim voluptates sapiente inventore eaque cum numquam beatae maiores ex laboriosam quo dolore qui officia, accusantium aperiam voluptate ab! At quam, quos architecto eos officia itaque est ex dignissimos alias voluptatem nisi voluptate. Ad, explicabo ex sit illo officiis."