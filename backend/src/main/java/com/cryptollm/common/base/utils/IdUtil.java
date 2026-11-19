package com.cryptollm.common.base.utils;

import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

/**
 * 雪花算法 ID 生成器。
 *
 * <p>参照 NetworkDisk 项目的 ID 方案实现，使用时间戳、机器位、数据中心位和
 * 毫秒内序列号生成全局递增的 Long 类型 ID。</p>
 */
public final class IdUtil {

    private static final long START_TIMESTAMP = 1288834974657L;
    private static final long WORKER_ID_BITS = 5L;
    private static final long DATA_CENTER_ID_BITS = 5L;
    private static final long SEQUENCE_BITS = 12L;

    private static final long MAX_WORKER_ID = ~(-1L << WORKER_ID_BITS);
    private static final long MAX_DATA_CENTER_ID = ~(-1L << DATA_CENTER_ID_BITS);
    private static final long SEQUENCE_MASK = ~(-1L << SEQUENCE_BITS);

    private static final long WORKER_ID_SHIFT = SEQUENCE_BITS;
    private static final long DATA_CENTER_ID_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS;
    private static final long TIMESTAMP_LEFT_SHIFT =
            SEQUENCE_BITS + WORKER_ID_BITS + DATA_CENTER_ID_BITS;

    private static final long WORKER_ID;
    private static final long DATA_CENTER_ID;

    private static long sequence;
    private static long lastTimestamp = -1L;

    static {
        long machineId = resolveMachineId();
        WORKER_ID = machineId & MAX_WORKER_ID;
        DATA_CENTER_ID = machineId & MAX_DATA_CENTER_ID;
    }

    private IdUtil() {
    }

    /**
     * 生成雪花 ID。
     *
     * @return 当前毫秒内的唯一 Long 类型 ID
     */
    public static synchronized Long get() {
        long timestamp = System.currentTimeMillis();
        if (timestamp < lastTimestamp) {
            throw new IllegalStateException(
                    "系统时钟发生回拨，拒绝生成 ID，回拨毫秒数："
                            + (lastTimestamp - timestamp)
            );
        }

        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            if (sequence == 0) {
                timestamp = waitNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }
        lastTimestamp = timestamp;

        return ((timestamp - START_TIMESTAMP) << TIMESTAMP_LEFT_SHIFT)
                | (DATA_CENTER_ID << DATA_CENTER_ID_SHIFT)
                | (WORKER_ID << WORKER_ID_SHIFT)
                | sequence;
    }

    private static long waitNextMillis(long previousTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= previousTimestamp) {
            timestamp = System.currentTimeMillis();
        }
        return timestamp;
    }

    private static long resolveMachineId() {
        try {
            StringBuilder machineInfo = new StringBuilder();
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            if (interfaces != null) {
                while (interfaces.hasMoreElements()) {
                    machineInfo.append(interfaces.nextElement());
                }
            }
            if (!machineInfo.isEmpty()) {
                return machineInfo.toString().hashCode();
            }
        } catch (SocketException ignored) {
            // 读取网卡失败时使用备用机器标识。
        }
        return (
                Runtime.getRuntime().availableProcessors()
                        + System.getProperty("os.name", "")
                        + System.getProperty("user.name", "")
        ).hashCode();
    }
}
