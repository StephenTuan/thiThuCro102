# Ứng dụng Quản lý Xe Máy

Ứng dụng React Native sử dụng Redux để quản lý danh sách xe máy.

## Tính năng

- Hiển thị danh sách xe máy
- Thêm, sửa, xóa xe máy
- Lọc xe máy theo giá
- Chọn ảnh từ thư viện hoặc chụp ảnh mới
- Kết nối với API (json-server)

## Cài đặt

1. Clone repository
2. Cài đặt dependencies:

```bash
npm install
```

3. Cài đặt json-server (nếu chưa có):

```bash
npm install -g json-server
```

## Chạy ứng dụng

1. Chạy API server:

```bash
npm run api
```

2. Chạy Metro server:

```bash
npm start
```

3. Chạy ứng dụng React Native (trong terminal khác):

```bash
npm run android
# hoặc
npm run ios
```

### iOS

Nếu chạy trên iOS, cần cài đặt CocoaPods dependencies:

```bash
bundle install
bundle exec pod install
```

## Cấu trúc thư mục

```
src/
  ├── api/            # API services
  ├── assets/         # Hình ảnh, tài nguyên
  ├── redux/          # Redux store
  │   ├── actions/    # Action creators
  │   ├── reducers/   # Reducers
  │   └── store/      # Store configuration
  └── screens/        # Màn hình ứng dụng
```

## Yêu cầu đề bài

1. Tạo API cho ứng dụng bằng json-server hoặc mockapi hoặc nodejs (1 điểm)
   - Resource: XeMay với các thuộc tính: ten_xe (string), mau_sac (string), gia_ban (number), mo_ta (string), hinh_anh (string)
   - Tên các thuộc tính trong resource phải có mã sinh viên

2. Tạo ứng dụng reactnative sử dụng Redux với các yêu cầu sau:
   - Màn hình chính hiển thị danh sách xe, trên đầu màn hình có hiển thị Banner quảng cáo tự chọn. Danh sách và banner tạo component riêng. (2đ)
   - Trên màn hình chính có nút thêm, bấm vào sẽ hiển thị màn hình thêm mới, các ô nhập text và nút bấm có sử dụng component tùy chỉnh. Thêm được dữ liệu vào API (2đ)
   - Xây dựng chức năng sửa (sửa được dữ liệu trên API) (2đ)
   - Xây dựng chức năng xóa (xóa được trên API) (1đ)
   - Ứng dụng sử dụng từ 3 hiệu ứng trở lên (tự chọn) (1đ)
   - Ứng dụng có chọn ảnh hoặc chụp ảnh (1đ)

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
