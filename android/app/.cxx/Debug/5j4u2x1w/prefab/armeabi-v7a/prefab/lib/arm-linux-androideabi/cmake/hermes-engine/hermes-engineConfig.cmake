if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/sagir/.gradle/caches/8.13/transforms/7fa9a29be46e46a12bdcd913faf6b7c6/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/sagir/.gradle/caches/8.13/transforms/7fa9a29be46e46a12bdcd913faf6b7c6/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

